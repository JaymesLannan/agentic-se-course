import type { Module } from "../types";

export const module: Module = {
  id: "m4",
  track: 1,
  trackName: "Foundations",
  order: 4,
  title: "RAG Systems",
  description: "Embeddings, vector stores, chunking strategies, retrieval (dense vs sparse vs hybrid), reranking, context injection, and diagnosing RAG failure modes in production.",
  estimatedMinutes: 90,
  content: `
# RAG Systems

Retrieval-Augmented Generation (RAG) is the most widely deployed pattern for giving LLMs access to accurate, up-to-date, domain-specific knowledge without fine-tuning. Understanding it deeply — the mechanics, the failure modes, and the tradeoffs — is one of the most valuable skills an agentic SE can have.

---

## The Problem RAG Solves

LLMs have two fundamental knowledge problems:
1. **Staleness** — training data has a cutoff date; the model doesn't know what happened last week
2. **Specificity** — the model can't know your company's internal processes, your codebase, or your client's product documentation

Fine-tuning solves the specificity problem but not staleness, is expensive, doesn't allow easy updates, and (critically) doesn't reliably inject facts — it changes behaviour patterns, not stored knowledge.

RAG solves both: at inference time, you retrieve relevant documents and inject them into the context. The model reasons over fresh, specific, context-supplied information rather than relying on what it learned during training.

---

## How RAG Works: The Full Pipeline

### Step 1: Ingestion (Offline)

Before you can retrieve anything, you need to index your documents. The ingestion pipeline:

1. **Load** documents (PDFs, markdown files, web pages, database records, etc.)
2. **Chunk** them into pieces small enough to retrieve meaningfully
3. **Embed** each chunk — convert it to a vector using an embedding model
4. **Store** the vectors and original text in a vector database

\`\`\`
Document: "Our refund policy allows returns within 30 days of purchase..."
                    ↓ (split into chunks)
Chunk: "Our refund policy allows returns within 30 days of purchase for unused items in original packaging."
                    ↓ (embed)
Vector: [0.023, -0.847, 0.291, ...]  (1536 dimensions for text-embedding-3-small)
                    ↓ (store)
Vector DB: { vector: [...], text: "Our refund policy...", metadata: { source: "policy.pdf", page: 3 } }
\`\`\`

### Step 2: Retrieval (Online, per query)

When a user asks a question:

1. **Embed the query** using the same embedding model used during ingestion
2. **Search the vector database** for chunks whose vectors are closest to the query vector
3. **Rank and filter** the results
4. **Return the top-k chunks**

\`\`\`
Query: "Can I return a damaged item?"
         ↓ (embed)
Query vector: [0.019, -0.831, 0.274, ...]
         ↓ (similarity search)
Top results:
  1. "Our refund policy allows returns within 30 days..." (similarity: 0.91)
  2. "Damaged items may be eligible for replacement..." (similarity: 0.87)
  3. "To initiate a return, contact customer support..." (similarity: 0.79)
\`\`\`

### Step 3: Generation

The retrieved chunks are injected into the prompt alongside the user's question:

\`\`\`
System: You are a helpful assistant. Answer questions using only the provided context.

Context:
[1] Our refund policy allows returns within 30 days of purchase for unused items...
[2] Damaged items may be eligible for replacement if reported within 48 hours...
[3] To initiate a return, contact customer support at returns@company.com...

User: Can I return a damaged item?
\`\`\`

The model generates an answer grounded in the retrieved context — not its training data.

---

## Embeddings: The Conceptual Foundation

An **embedding** is a dense vector representation of text that captures semantic meaning. The key property: texts that are semantically similar have vectors that are geometrically close.

\`\`\`
embed("The dog ran quickly") ≈ embed("The canine sprinted")
// High cosine similarity (~0.93)

embed("The dog ran quickly") ≠ embed("Quarterly earnings report")
// Low cosine similarity (~0.12)
\`\`\`

This is what makes retrieval semantic rather than keyword-based. You're not matching words — you're matching meaning.

**Choosing an embedding model:**
- OpenAI text-embedding-3-small: 1536 dimensions, fast, cheap, good for most use cases
- OpenAI text-embedding-3-large: 3072 dimensions, better quality, more expensive
- Voyage AI (Anthropic's recommended option): strong performance especially on code and technical text
- Cohere Embed: good multilingual support

**Critical rule:** Always use the same embedding model for ingestion and retrieval. Embeddings from different models are not comparable.

---

## Chunking: The Most Underestimated Problem

Chunking is how you split documents before embedding them. It has more impact on RAG quality than almost any other parameter. Most RAG systems that fail in production are failing because of bad chunking.

### Fixed-size chunking
Split every N tokens regardless of content boundaries.
- Simple to implement
- Bad for meaning: "The temperature should be maintained at exactly 37°C. This ensures..." might split at "37°"
- Rarely the right choice for quality systems

### Recursive character splitting
Split on paragraph breaks first, then sentences, then words, then characters — stopping when chunks are small enough.
- Better than fixed-size: respects natural language boundaries
- Still misses semantic coherence

### Semantic chunking
Embed each sentence, then split when adjacent sentences have low similarity — meaning a topic change occurred.
- Best quality, most expensive
- Appropriate for high-value retrieval systems

### Document-structure-aware chunking
For structured documents (markdown, PDFs with sections, code files), use the structure:
- Markdown: split on headings (H1 → H2 → H3 hierarchy)
- Code: split on function/class boundaries
- PDFs: split on page breaks + detect section headers

**Chunk size tradeoffs:**
- Smaller chunks (128-256 tokens): more precise retrieval but lose context; risk splitting mid-argument
- Larger chunks (512-1024 tokens): more context but retrieval is less precise; harder to surface specific facts
- Sweet spot for most use cases: 256-512 tokens with 10-20% overlap between chunks

**Overlap:** Including the last N tokens of the previous chunk in the next chunk prevents losing information at boundaries. Always use overlap.

---

## Retrieval Strategies

### Dense Retrieval (Semantic Search)
Uses vector similarity (cosine, dot product) to find semantically related chunks. Best for: natural language questions, paraphrased queries, conceptual searches.

Weakness: fails on exact matches. "What is the ref number for invoice INV-2847?" — a dense search might retrieve all invoice-related documents, not the one with that specific number.

### Sparse Retrieval (BM25 / Keyword Search)
Uses term frequency and inverse document frequency — the same principles as traditional search engines. Best for: exact phrase matching, proper nouns, codes, identifiers.

Weakness: no semantic understanding. "What do we charge for cloud storage?" won't match a document that says "our object persistence pricing".

### Hybrid Retrieval
Combines dense and sparse retrieval, typically with a weighted sum or reciprocal rank fusion. This is the right default for production systems — you get semantic understanding AND exact matching.

\`\`\`
Final score = (0.7 × dense_score) + (0.3 × sparse_score)
\`\`\`

### Reranking
After initial retrieval, pass the top-k results through a cross-encoder reranker — a model specifically trained to score relevance. More expensive but significantly improves precision.

Initial retrieval: top-20 results
After reranking: top-5 results, in better order

---

## RAG Failure Modes in Production

These are the failures you'll be diagnosing at client sites.

### Failure 1: Wrong documents retrieved
**Symptom:** The answer is wrong and not supported by any retrieved document.
**Cause:** Query embedding doesn't match relevant chunk embedding — usually a chunking or embedding mismatch.
**Fix:** Evaluate retrieval precision separately from generation quality. If retrieval is wrong, improve chunking or switch embedding model.

### Failure 2: Right documents, wrong answer
**Symptom:** Retrieved chunks contain the answer, but the model generates something different.
**Cause:** Context is too long and model missed the relevant section; model's training knowledge overrides retrieved context; conflicting information in retrieved chunks.
**Fix:** Rerank more aggressively, inject fewer but higher-quality chunks, add explicit instruction to prefer retrieved context over training knowledge.

### Failure 3: Outdated answers
**Symptom:** System gives answers that were correct 6 months ago but are now wrong.
**Cause:** Ingestion pipeline isn't running, or documents were updated but old versions weren't removed.
**Fix:** Implement document versioning, trigger re-ingestion on document update, include last-updated timestamp in metadata and retrieved context.

### Failure 4: Hallucinated citations
**Symptom:** Model confidently cites specific sections that don't exist.
**Cause:** Model is synthesising a plausible citation rather than using the retrieved context.
**Fix:** Return source references in retrieval, instruct model to only cite from provided context, add post-processing to validate citations against retrieved documents.

### Failure 5: Retrieved chunks lack coherence
**Symptom:** Individual retrieved chunks don't make sense without surrounding context.
**Cause:** Chunks split at bad boundaries — mid-argument, mid-table, mid-list.
**Fix:** Better chunking strategy (semantic or structure-aware), increase overlap, consider retrieving parent chunks.

---

## Worked Example: RAG for a Codebase Q&A System

**Problem:** Engineering team wants to ask natural language questions about a 200K-line TypeScript codebase.

**Ingestion strategy:**
- Split on file boundaries first, then on function/class declarations
- Chunk size: ~300 tokens with 50-token overlap
- Include metadata: file path, function name, git blame (last modified by whom)
- Embed with Voyage AI code model (optimised for code)

**Retrieval strategy:**
- Hybrid search: semantic for conceptual queries ("how does authentication work") + keyword for specific queries ("find all uses of UserContext")
- Rerank top-20 to top-5
- Return file path and line range with each chunk

**Generation:**
- System prompt: "Answer questions about the codebase using the provided code excerpts. Always cite the file path and function name."
- Include 3-5 most relevant chunks
- If query is ambiguous, ask for clarification before retrieving

**Result:** Engineers can ask "where does session expiry get handled?" and get a precise, cited answer pointing to the right file and function.

---

## Key Takeaways

1. RAG = retrieve relevant context → inject into prompt → generate grounded answer
2. Embeddings capture semantic meaning; same model must be used for ingestion and retrieval
3. Chunking has more impact on quality than almost anything else — invest in getting it right
4. Hybrid retrieval (dense + sparse) is the right default for production
5. Reranking significantly improves precision with modest additional cost
6. Evaluate retrieval quality independently from generation quality — they fail for different reasons
`,
  questions: [
    {
      id: "m4-q1",
      type: "conceptual",
      text: "Why is fine-tuning unreliable for injecting current factual knowledge into an LLM?",
      options: [
        "Fine-tuning is too expensive to run frequently enough to keep knowledge current",
        "Fine-tuning changes model weights to reflect patterns, but facts can still be hallucinated and knowledge cannot be updated without retraining",
        "Fine-tuning reduces model quality on tasks outside the training set, making it unsuitable for factual use cases",
        "Fine-tuning requires labeled data, and factual knowledge is difficult to label correctly",
      ],
      correctAnswer: "Fine-tuning changes model weights to reflect patterns, but facts can still be hallucinated and knowledge cannot be updated without retraining",
      rubric: "Correct answer: fine-tuning changes weights (behaviour patterns), not a reliable fact-store. Facts injected via fine-tuning can still be hallucinated when the model averages conflicting training patterns, and knowledge becomes stale the moment it changes. RAG injects facts at inference time — they're explicitly in the context, not baked into weights.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m4-q2",
      type: "conceptual",
      text: "Explain the difference between dense, sparse, and hybrid retrieval. For each, give a concrete query example where it performs well and one where it fails.",
      rubric: "Dense: semantic similarity, good for 'what is our leave policy?' bad for 'find invoice INV-2847'. Sparse: keyword matching, good for exact identifiers, bad for paraphrased queries. Hybrid: combines both, handles most cases well. Must give specific examples for each. Weak answer gives vague descriptions without concrete examples.",
      maxScore: 15,
      placeholder: "Explain all three strategies with good/bad query examples for each...",
    },
    {
      id: "m4-q3",
      type: "applied",
      text: "A RAG system returns HR policy answers from 3 months ago even though documents were updated. What is the most likely root cause?",
      options: [
        "The embedding model has drifted and is no longer matching queries to the correct documents",
        "The ingestion pipeline is not re-running when documents change, so old chunks remain in the vector index alongside or instead of updated content",
        "The LLM is ignoring the retrieved context and defaulting to its training knowledge",
        "The chunking strategy splits policy documents too aggressively, losing key update markers",
      ],
      correctAnswer: "The ingestion pipeline is not re-running when documents change, so old chunks remain in the vector index alongside or instead of updated content",
      rubric: "Correct answer: the ingestion pipeline isn't re-running on document change. RAG systems serve whatever is in the vector index — if updated documents aren't re-indexed and old chunks aren't removed, queries will retrieve stale content. The fix requires automated re-ingestion on document change (webhook or scheduled job) plus soft-deletion of superseded chunks.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m4-q4",
      type: "applied",
      text: "You're evaluating a client's RAG system before a product launch. You run 50 test queries and find: retrieval returns the right document 90% of the time, but the final answer is correct only 60% of the time. What does this gap tell you about where the failure is, and what specifically would you investigate?",
      rubric: "Strong answer: gap between retrieval quality (90%) and answer quality (60%) isolates the failure to generation, not retrieval — the right documents are coming back but the model isn't using them correctly. Investigates: context too long and model missing relevant section (lost in middle), conflicting chunks (old + new policy both retrieved), model training knowledge overriding context, instruction quality in system prompt. Proposes: reduce k, rerank more aggressively, add explicit instruction to prefer context, test with smaller chunk count. Weak answer doesn't separate retrieval from generation quality.",
      maxScore: 20,
      placeholder: "Explain what the gap tells you and what you'd specifically investigate...",
    },
    {
      id: "m4-q5",
      type: "hands_on",
      text: "Which chunking approach is most appropriate for a step-by-step procedure section in a technical operations manual?",
      options: [
        "Split on a fixed token boundary of 512 tokens with 10% overlap, regardless of step boundaries",
        "Keep each numbered step as its own chunk and include the procedure title as metadata so steps are retrievable in context",
        "Keep the entire procedure as a single chunk to preserve all steps together for any query",
        "Split on sentence boundaries and embed each sentence individually for maximum retrieval granularity",
      ],
      correctAnswer: "Keep each numbered step as its own chunk and include the procedure title as metadata so steps are retrievable in context",
      rubric: "Correct answer: one chunk per numbered step with procedure title as metadata. Fixed token splitting (option 1) breaks steps mid-instruction. Keeping the whole procedure as one chunk (option 3) makes it too large and retrieves irrelevant steps. Sentence-level splitting (option 4) loses the step-as-unit semantic coherence. Per-step chunking with title metadata allows precise retrieval of specific steps while maintaining context.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m4-q6",
      type: "hands_on",
      text: "Write the evaluation framework you'd use to measure the quality of a RAG system before declaring it production-ready. Include: what metrics you'd measure, how you'd create the test set, what thresholds you'd require, and how you'd diagnose a failing metric.",
      rubric: "Strong answer covers: retrieval metrics (recall@k, precision@k, MRR), generation metrics (answer correctness, faithfulness/groundedness, citation accuracy), test set creation (golden questions with known answers, adversarial queries, out-of-scope queries). Thresholds: retrieval recall@5 > 85%, faithfulness > 90%, answer correctness > 80%. Diagnosis: low recall → chunking/embedding issue; low faithfulness → generation issue; low correctness but high faithfulness → retrieval issue. Should mention human eval for a subset.",
      maxScore: 20,
      placeholder: "Write the full evaluation framework with metrics, test set, thresholds, and diagnosis...",
    },
    {
      id: "m4-q7",
      type: "edge_case",
      text: "A RAG system over support tickets gives great answers for Product A (8,000 tickets) but poor answers for Product B (200 tickets). What is the most direct fix?",
      options: [
        "Switch from dense to sparse retrieval so the system relies on keyword matching rather than semantic similarity",
        "Add a product metadata filter to retrieval queries so Product B queries only retrieve Product B tickets, preventing Product A dominance",
        "Reduce chunk size for Product B tickets so more of them fit in the retrieval results",
        "Increase the number of retrieved chunks (k) so that Product B tickets are statistically more likely to appear",
      ],
      correctAnswer: "Add a product metadata filter to retrieval queries so Product B queries only retrieve Product B tickets, preventing Product A dominance",
      rubric: "Correct answer: add a product metadata filter. Product A dominates the embedding space due to volume — Product B queries retrieve Product A tickets as nearest neighbors. A metadata filter ensures Product B queries only search the Product B subset, eliminating cross-product contamination. Increasing k (option 4) just retrieves more Product A tickets. Smaller chunks (option 3) don't address the imbalance.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m4-q8",
      type: "edge_case",
      text: "A client asks: 'Should we use RAG or just use a really large context window and put all our documents in the prompt every time?' Their documentation is 2MB of text (~500,000 tokens). Make the case for RAG using concrete numbers and real tradeoffs — don't just say 'RAG is better'.",
      rubric: "Strong answer: 500K tokens at ~$15/1M tokens = $7.50 per query just for input context vs RAG at $0.001 per retrieval + $0.15 for 2K tokens of retrieved context; 500K context introduces severe lost-in-middle degradation; latency for 500K context processing is 10-30 seconds vs sub-second for RAG; when docs update, you update the index not rebuild every prompt. However, also acknowledges when full context IS appropriate: when all docs are always relevant (small corpora), when you need cross-document synthesis. Nuanced answer wins.",
      maxScore: 20,
      placeholder: "Make the case for RAG with concrete numbers, but acknowledge when full context is appropriate...",
    },
  ],
};
