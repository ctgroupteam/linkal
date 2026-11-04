# 🎯 Universal Agentic Engineering & Token Optimization Rules

> **Core Operating Philosophy**:
> 1. **Priority #1 — Code Quality & Production Readiness**: Code must always be production-ready, robust, performant, and fully functional. Never compromise features, tests, or architecture. If a bug or solution cannot be found via targeted inspection, ALWAYS read the full code thoroughly rather than making assumptions.
> 2. **Priority #2 — Maximum Token & Turn Efficiency**: Eliminate redundant re-reads, context bloat, turn-by-turn round trips, and unnecessary file scanning to cut token consumption by 80–90% across any project.

---

## 🏛️ Rule Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│  Goal 1: Production-Ready Code & Feature Completeness   │  <-- Absolute Must
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────┐
│  Goal 2: 80–90% Token Reduction & Rapid Execution       │  <-- Operating Standard
└─────────────────────────────────────────────────────────┘
```

---

## ⚡ The 12 Universal Golden Practices

### 1. Tiered Context Discovery
- **Level 1 (Architecture Map)**: Check project documentation, architecture overviews, or `README.md` first to locate directory structures, module responsibilities, and key interfaces.
- **Level 2 (Precision Slices)**: Use line-range reads (`view_file` with `StartLine` and `EndLine` covering 20–60 lines) around target symbols, functions, or styles instead of loading full multi-thousand-line files.
- **Level 3 (Deep Read)**: Read full files or larger spans **only** when tracing unfamiliar cross-module logic, complex state mutations, or elusive bugs. Never blind-guess code.

### 2. Deterministic In-Place Refactoring
- For single-location or small block edits: Use targeted string replacement tools (`replace_file_content`).
- For complex, multi-section structural rewrites across massive files: Write and execute a dedicated local script (Node.js, Python, or PowerShell) in a temporary scratch directory. This executes the change deterministically on disk without streaming thousands of lines back and forth across conversational context.

### 3. Pipelined Terminal Execution
- Combine dependent shell commands into single command pipelines:
  ```bash
  # Linux/macOS
  npm run test && npm run build && git commit -am "feat: description"
  # Windows PowerShell
  npm run test; npm run build; git commit -am "feat: description"
  ```
- Executing complementary tasks together eliminates redundant model round-trips and saves conversational context turns.

### 4. Milestone-Based Fresh Chat Strategy
- As conversations progress past 15–20 turns, accumulated history carries 40k–80k tokens of passive context into every subsequent prompt.
- When transitioning to a new feature, module, or distinct milestone, start a fresh conversation. The new session reads project documentation in 1 turn and begins with a clean ~3k token baseline.

### 5. Defensive Code Preservation & Zero Regressions
- Never remove, truncate, or overwrite existing comments, documentation, or unrelated functions unless explicitly instructed.
- Never blind-guess function signatures, variable names, database schemas, or API endpoints. Verify definitions before modifying callers.

### 6. Design System & Styling Fidelity (Project-Agnostic)
- When modifying UI components, inspect and adhere strictly to the project's *existing* styling framework and color palette (CSS variables, Tailwind config, theme objects, or global stylesheets).
- Never hardcode foreign colors, tokens, or arbitrary styles from other projects. Match the host repository's established aesthetic.

### 7. Decoupled Media & Heavy Binary Assets
- Never embed raw base64 data, massive JSON fixtures, or binary assets directly into code files or chat prompts.
- Reference assets via external paths, content delivery networks (CDNs), or clean vector SVGs to keep token payloads minimal.

### 8. Headless & Fast Automated Verification
- Verify deployments, syntax, and logic using fast headless checks (unit test suites, linter commands, type-checkers, or HTTP status probes).
- Only launch heavy browser subagents or visual automation when layout rendering or screenshot review is explicitly requested.

### 9. Anti-Polling & Reactive Execution
- Never execute loops or poll terminal commands waiting for background processes or dev servers.
- Use native background task management and rely on reactive notifications to resume execution.

### 10. Milestone Documentation Updates
- Avoid updating high-level architecture documents or change logs on every minor typo or styling tweak.
- Record documentation updates only upon completing major features, architectural milestones, or key decisions.

### 11. Idempotent Scratch Automation
- Store temporary automation scripts, migration runners, and one-off test harnesses in a git-ignored directory (e.g., `scratch/` or `.tmp/`).
- Write scripts to be idempotent so they can be safely re-run without producing side effects.

### 12. Strict Pre-Commit Verification
- Always run `git status` or `git diff --stat` before committing to confirm that only intended files are staged and no files were unintentionally altered or deleted.
