import type { Module } from "../types";

export const module: Module = {
  id: "m8",
  track: 2,
  trackName: "Coding Agents in Practice",
  order: 8,
  title: "MCPs & Tool Integration",
  description: "MCP architecture (host/client/server), transport types, tool vs resource vs prompt primitives, building an MCP server, real-world examples, and security considerations.",
  estimatedMinutes: 90,
  content: `
# MCPs & Tool Integration

Model Context Protocol (MCP) is Anthropic's open standard for connecting AI models to external tools, data sources, and services. It's the infrastructure layer that allows Claude to interact with the world beyond its training data. As an Agentic SE, you'll be designing, recommending, and sometimes building MCP servers for clients.

---

## What Problem MCP Solves

Before MCP, integrating an LLM with external systems required custom code for every integration. You'd write tool definitions in your application code, handle the tool execution, and manage the connection to external services — all in a bespoke way.

MCP standardises this. Instead of every application reinventing tool integration, MCP provides:
- A standard protocol for tools to expose their capabilities
- A standard way for AI hosts to discover and call those tools
- Separation of concerns: the AI application doesn't need to know the implementation details of each tool

Think of MCP like HTTP for AI integrations — a protocol that allows any compliant client to talk to any compliant server, regardless of what's behind either.

---

## MCP Architecture: The Three Roles

### Host
The **host** is the application running the AI model — Claude Code, Claude.ai, or your custom application. The host:
- Manages the user interaction
- Coordinates between the AI model and MCP clients
- Decides which MCP servers are available to the model

### Client
The **MCP client** lives inside the host application. It connects to MCP servers and translates between the host's needs and the MCP protocol. There is one client per server connection.

### Server
The **MCP server** is the external service that exposes tools, resources, or prompts. It can be:
- A local process (running on the same machine)
- A remote service (running in the cloud)
- A language-specific library (Node.js, Python, etc.)

\`\`\`
┌─────────────────────────────────┐
│           HOST (Claude Code)     │
│  ┌─────────┐  ┌─────────────┐   │
│  │  Claude │  │ MCP Client  │   │
│  │  Model  │◄─┤ (per server)│   │
│  └─────────┘  └──────┬──────┘   │
└─────────────────────┼───────────┘
                       │ MCP Protocol
              ┌────────┴─────────┐
              ▼                  ▼
     ┌─────────────┐    ┌─────────────┐
     │  MCP Server │    │  MCP Server │
     │  (GitHub)   │    │  (Database) │
     └─────────────┘    └─────────────┘
\`\`\`

---

## The Three MCP Primitives

MCP servers can expose three types of capabilities:

### 1. Tools
**Tools** are functions the model can call to take actions or retrieve information. They have:
- A name (e.g., \`create_issue\`)
- A description (how the model knows when to use it)
- An input schema (JSON Schema for parameters)
- An execution function (what happens when called)

Tools are the primary MCP primitive for agentic systems. They map directly to the tool calling mechanism we covered in Module 3.

\`\`\`typescript
{
  name: "create_github_issue",
  description: "Create a new GitHub issue in a repository",
  inputSchema: {
    type: "object",
    properties: {
      repo: { type: "string", description: "Repository in owner/name format" },
      title: { type: "string", description: "Issue title" },
      body: { type: "string", description: "Issue body in markdown" },
      labels: { type: "array", items: { type: "string" }, description: "Labels to apply" }
    },
    required: ["repo", "title"]
  }
}
\`\`\`

### 2. Resources
**Resources** are data sources the model can read — files, database records, API responses. Unlike tools (which do something), resources are read-only data providers.

Resources have URIs that identify them:
- \`file:///path/to/local/file\`
- \`database://users/42\`
- \`api://products/current\`

The model can request resources, and the MCP server returns their content. This is useful for providing the model with access to live data without injecting it into the context upfront.

### 3. Prompts
**Prompts** are reusable message templates stored server-side. They allow teams to version-control and standardise prompts, making them available across multiple AI applications without duplication.

\`\`\`typescript
{
  name: "code_review",
  description: "Standard code review prompt for this team's standards",
  arguments: [
    { name: "diff", description: "The PR diff to review", required: true },
    { name: "context", description: "Additional context about the change", required: false }
  ]
}
\`\`\`

---

## Transport Types

MCP servers communicate with clients over one of two transport mechanisms:

### stdio (Standard Input/Output)
The server runs as a local process. Communication happens over stdin/stdout. This is:
- Simple to implement
- Zero network configuration
- Appropriate for local tools (filesystem, shell commands, local databases)
- Not appropriate for remote services

### HTTP with SSE (Server-Sent Events)
The server runs as an HTTP service. Communication uses POST requests for commands and SSE for streaming responses. This is:
- Required for remote services
- Appropriate for multi-user deployments
- More complex to set up and secure
- Necessary for cloud-hosted tools

Most MCP servers clients interact with locally (Claude Code on a developer's machine) use stdio. Production deployments serving multiple users use HTTP.

---

## Building an MCP Server

Here's the anatomy of an MCP server in TypeScript using the official SDK:

\`\`\`typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "jira-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Declare available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_issue",
      description: "Retrieve a Jira issue by key",
      inputSchema: {
        type: "object",
        properties: {
          key: { type: "string", description: "Jira issue key (e.g., PROJ-123)" }
        },
        required: ["key"]
      }
    },
    {
      name: "create_issue",
      description: "Create a new Jira issue",
      inputSchema: {
        type: "object",
        properties: {
          project: { type: "string" },
          summary: { type: "string" },
          description: { type: "string" },
          issuetype: { type: "string", enum: ["Bug", "Story", "Task"] }
        },
        required: ["project", "summary", "issuetype"]
      }
    }
  ]
}));

// Execute tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_issue") {
    const issue = await jiraClient.getIssue(args.key);
    return { content: [{ type: "text", text: JSON.stringify(issue) }] };
  }

  if (name === "create_issue") {
    const created = await jiraClient.createIssue(args);
    return { content: [{ type: "text", text: \`Created: \${created.key}\` }] };
  }

  throw new Error(\`Unknown tool: \${name}\`);
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

The pattern is simple: declare tools, handle tool calls, return results.

---

## Real-World MCP Examples

**Development tools:**
- GitHub MCP: create issues, review PRs, manage releases
- Linear MCP: manage tasks, update status, assign issues
- Sentry MCP: query errors, view stack traces, create issues from errors

**Data sources:**
- PostgreSQL MCP: query databases, describe schemas
- Notion MCP: read/write documents, query databases
- Google Drive MCP: read documents, list files

**Communication:**
- Slack MCP: send messages, read channels, create threads
- Email MCP: read inbox, send emails, manage labels

---

## Security Considerations

MCP servers can do powerful things. This creates real security risks that must be designed against.

**Authentication:**
Every MCP server should verify the caller is who they claim to be. For local tools, this is often handled by process ownership. For remote tools, use API keys, OAuth tokens, or mutual TLS.

**Authorisation:**
Just because a model can call a tool doesn't mean it should be able to call it with any parameters. Scope tool access to the minimum necessary.

**Input validation:**
Never trust tool call arguments without validation. The model may produce malformed or malicious arguments (especially if the model itself has been manipulated via prompt injection). Validate all inputs against the schema and apply business logic constraints.

**Audit logging:**
Every tool call should be logged with: who called it, what parameters, when, and what the result was. This is essential for debugging and security auditing.

**Destructive actions:**
Tools that delete, send, or irreversibly modify data should require explicit confirmation or rate limiting. Consider requiring a \`confirm: true\` parameter for any destructive action.

---

## Worked Example: Documentation MCP Server

**Client need:** Engineers want to ask Claude Code questions about internal documentation without copy-pasting docs into every session.

**MCP Design:**

\`\`\`
Server: internal-docs-mcp (stdio, runs locally)

Tools:
1. search_docs(query: string, section?: string) → returns top 5 relevant chunks
2. get_document(path: string) → returns full document content
3. list_documents(section?: string) → returns document index

Resources:
- docs://architecture/* → architecture decision records
- docs://runbooks/* → operational runbooks
- docs://api/* → API documentation

Under the hood:
- search_docs uses local embeddings (documents pre-indexed at startup)
- get_document reads from a local Git checkout of the docs repo
- list_documents reads the directory structure
\`\`\`

**Result:** Engineers add this MCP server to their Claude Code config. Claude Code can now answer "what's the architecture for handling payments?" by searching internal docs rather than asking the engineer to provide context.

---

## Key Takeaways

1. MCP is the standard protocol for AI-to-tool integration — client/host/server architecture
2. Three primitives: tools (actions), resources (read-only data), prompts (reusable templates)
3. Two transports: stdio (local) and HTTP/SSE (remote)
4. Building an MCP server = declare tools, handle calls, return structured results
5. Security is not optional: validate inputs, enforce authorisation, log everything
6. MCP servers are the recommended pattern over ad-hoc tool implementations for reusability
`,
  questions: [
    {
      id: "m8-q1",
      type: "conceptual",
      text: "Explain the MCP architecture — what are the three roles (host, client, server) and what is each responsible for? How does this separation of concerns improve on custom tool implementations?",
      rubric: "Strong answer: host (AI application, user interaction, coordination), client (protocol translation, one per server), server (exposes capabilities, external systems). Improvement over custom: standardisation means any MCP-compatible host can use any MCP server; separation means server implementation doesn't change when host changes; reusability across multiple AI applications. Weak answer just describes the three roles without explaining the benefit of the separation.",
      maxScore: 15,
      placeholder: "Explain all three roles and the benefit of the separation...",
    },
    {
      id: "m8-q2",
      type: "conceptual",
      text: "When would you choose stdio transport vs HTTP/SSE for an MCP server? Give a concrete scenario for each and explain why the other transport would be wrong for that scenario.",
      rubric: "stdio: local development tools, single-user, no network needed (e.g., filesystem tool, local database); wrong for remote: can't cross network boundary. HTTP/SSE: multi-user deployments, remote services, production environments (e.g., GitHub integration used by 50 engineers); wrong for local: adds unnecessary network configuration and security surface. Must give concrete scenarios and explain why the alternative is wrong, not just worse.",
      maxScore: 15,
      placeholder: "Give a scenario for each transport and explain why the other would be wrong...",
    },
    {
      id: "m8-q3",
      type: "applied",
      text: "A client wants Claude Code to be able to query their internal PostgreSQL database directly. Design the MCP server for this integration: what tools would you expose, what would you NOT expose, what security controls would you implement, and how would you handle the fact that their database contains sensitive PII?",
      rubric: "Strong answer: tools: execute_query(sql, params), describe_table(name), list_tables(schema), get_query_plan(sql) — NOT: any write operations unless explicitly required; security: separate read-only DB user for the MCP server, parameterised queries only (no string concatenation), SQL injection prevention at MCP layer, allowlist of permitted tables/schemas (exclude PII tables or require explicit role to access), audit log all queries; PII: mask or exclude PII columns from query results by default, require elevated permission to query PII tables, data minimisation in query results.",
      maxScore: 20,
      placeholder: "Design the tools, exclusions, security controls, and PII handling...",
    },
    {
      id: "m8-q4",
      type: "applied",
      text: "You're evaluating two approaches to giving Claude Code access to a client's Jira instance: (A) write a custom tool function in the Claude Code session that calls the Jira API directly, or (B) build a Jira MCP server. The client has 25 engineers and plans to expand Claude Code use over the next 6 months. Make the case for approach B and identify any scenarios where approach A might still make sense.",
      rubric: "Case for B: reusable across all 25 engineers without each configuring API access; Jira integration is maintained in one place; can be versioned and updated centrally; composable with other MCP tools; scales with team growth. Scenarios for A: one-off task, prototype/exploration, engineer needs custom Jira behaviour not in standard MCP, very restricted use case. Strong answer doesn't dismiss A entirely — recognises it's appropriate for exploratory or one-off work.",
      maxScore: 20,
      placeholder: "Make the case for MCP while identifying when the custom approach is still valid...",
    },
    {
      id: "m8-q5",
      type: "hands_on",
      text: "Design a complete MCP server for a client's internal documentation system. They have: a Git repository of markdown documentation, a search index (Elasticsearch), and an access control system where some documents are team-restricted. Write the full tool definitions (name, description, input schema) for all tools the server should expose, and describe the under-the-hood implementation of each.",
      rubric: "Strong answer includes: search_documentation(query, section?, team?), get_document(path), list_sections(), get_document_metadata(path), check_access(path, team). Each has proper description with when-NOT-to-use, complete input schema with types and required fields. Implementation: search → Elasticsearch query with team filter; get_document → Git file read with access check; list_sections → directory traversal; check_access → call auth service. Security: every tool call validates team membership before returning content.",
      maxScore: 20,
      placeholder: "Write all tool definitions with full schemas and implementation descriptions...",
    },
    {
      id: "m8-q6",
      type: "hands_on",
      text: "A client's security team has approved an MCP server for querying their database, but with conditions: all queries must be logged, the model should not be able to run queries affecting more than 1000 rows, and SELECT * queries on tables containing 'user' in the name are prohibited. Implement these three security controls in the MCP server's tool handler (write the validation code logic, not full implementation).",
      rubric: "Strong answer writes pseudocode/logic for: (1) audit logging — log every call with timestamp, query, user context, row count before returning; (2) row limit — execute query with LIMIT 1001, if row count > 1000 return error with row count info; (3) SELECT * on user tables — parse SQL to detect SELECT * and table name containing 'user', reject with specific error message before executing. Must show the validation happening BEFORE execution for security. Weak answer describes what the controls should do without showing the implementation logic.",
      maxScore: 20,
      placeholder: "Write the validation logic for all three security controls...",
    },
    {
      id: "m8-q7",
      type: "edge_case",
      text: "An engineer at a client site builds an MCP server for their CRM. The MCP server has a send_email tool. A few days after deployment, someone notices the AI assistant has been sending test emails to real customers — it turns out the engineer used the production CRM credentials in the MCP server, and the model was calling send_email during testing. How do you prevent this class of problem in future MCP deployments?",
      rubric: "Strong answer covers multiple layers: (1) environment separation — MCP servers must have separate dev/staging/prod configs; (2) explicit confirmation requirement for destructive/external actions — send_email requires confirm: true parameter; (3) rate limiting — maximum N emails per hour/day at the MCP layer; (4) dry_run mode — send_email has a dry_run parameter that logs but doesn't send; (5) allowlist of email addresses for development; (6) separate MCP server instances per environment. Systematic, not just 'be more careful'.",
      maxScore: 20,
      placeholder: "Design systematic controls to prevent this class of problem...",
    },
    {
      id: "m8-q8",
      type: "edge_case",
      text: "A client asks: 'We have 12 different internal systems we want Claude to be able to access. Should we build one big MCP server that connects to all of them, or 12 separate MCP servers?' Walk them through the tradeoffs and give a recommendation with reasoning.",
      rubric: "Strong answer: 12 separate MCP servers — better separation of concerns (failure in one doesn't affect others), independent deployment/versioning, clearer security boundaries (each server uses only the credentials it needs), easier to grant/revoke access to individual systems, follows single responsibility principle; but has overhead of managing 12 servers. One big server: simpler to manage, shared auth logic; but single point of failure, harder to give engineers access to subset of tools, complex code with mixed concerns. Recommendation: 12 separate, but consider grouping closely related systems (e.g., all GitHub tools in one server, all Jira tools in one). Shows system design maturity.",
      maxScore: 20,
      placeholder: "Walk through the tradeoffs and give a reasoned recommendation...",
    },
  ],
};
