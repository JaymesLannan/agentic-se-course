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
      text: "Why does fine-tuning not reliably solve the problem of injecting factual knowledge into an LLM? What does fine-tuning actually change, and why is RAG a better architecture for knowledge grounding?",
      rubric: "Strong answer: fine-tuning changes behaviour patterns and style, not a reliable fact-store; facts injected via fine-tuning can still be hallucinated when the model 'averages' conflicting patterns; fine-tuning can't update knowledge without re-training; RAG injects facts at inference time — they're in the context, not in weights. Weak answer says 'fine-tuning is expensive' without explaining the fundamental knowledge-grounding difference.",
      maxScore: 15,
      placeholder: "Explain what fine-tuning actually changes and why RAG is better for factual grounding...",
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
      text: "A client's RAG system over their internal HR documentation is giving outdated answers. The policies were updated 3 months ago but the system still returns old information. Diagnose all the possible failure points in the pipeline and propose a comprehensive fix.",
      rubric: "Strong answer covers: ingestion pipeline not re-running on document update, old chunks not being deleted/superseded when documents update, no metadata tracking for document version/date, model not being told to prefer recent context. Fix includes: automated re-ingestion on document change (webhook or scheduled), soft-delete old chunks, add last-updated metadata to all chunks, include document date in retrieved context. Weak answer just says 'update the documents'.",
      maxScore: 20,
      placeholder: "Diagnose all failure points and propose a comprehensive fix for each...",
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
      text: "Design a chunking strategy for a 200-page technical operations manual (PDF) that includes: a table of contents, narrative sections, step-by-step procedures, tables of parameters, and code snippets. Specify: chunk size, overlap, splitting strategy for each content type, and what metadata to store with each chunk.",
      rubric: "Strong answer gives different strategies per content type: narrative sections — 512 tokens, 10% overlap, split on paragraph; procedures — keep each numbered step as a chunk, include the procedure title as metadata; tables — keep tables intact as single chunks with column headers; code snippets — keep as single chunks with language tag; TOC — index separately, use as routing layer. Metadata: section title, page number, content type, procedure name where applicable. Weak answer proposes one uniform chunking strategy for all content types.",
      maxScore: 20,
      placeholder: "Design the full chunking strategy for each content type with metadata...",
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
      text: "A client builds a RAG system over 10 years of customer support tickets. Users start reporting that the system is 'biased' — it gives better answers for certain product lines and much worse answers for others. You investigate and find the ticket volume is heavily skewed: Product A has 8,000 tickets, Product B has 200 tickets. How does this affect the RAG system, and what are your options for fixing it?",
      rubric: "Strong answer: volume imbalance means Product B is underrepresented in the vector space — queries about Product B may retrieve Product A tickets as nearest neighbours; embedding space is dominated by Product A vocabulary and patterns. Fixes: (1) separate retrieval indices per product with routing; (2) upsample/weight Product B documents; (3) add product metadata filter to retrieval query; (4) hybrid retrieval where sparse component helps Product B's specific terminology. Weak answer doesn't explain the embedding space imbalance mechanism.",
      maxScore: 20,
      placeholder: "Explain the mechanism of the bias and propose multiple fixing strategies...",
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
