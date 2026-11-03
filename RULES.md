# 🎯 Antigravity Agent Rules & Token Optimization Guide

> **Core Philosophy**:
> 1. **Priority #1 — Code Integrity & Quality**: Code must always be production-ready, beautiful, robust, and completely functional. Never compromise features, design, or correctness. If a solution is elusive, read the full code thoroughly.
> 2. **Priority #2 — Maximum Token & Context Efficiency**: Eliminate redundant re-reading, context bloat, and round-trip tool churn to save 80–90% of token consumption across development sessions.

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

## ⚡ The 12 Golden Practices for Development

### 1. Tiered Context Discovery
- **Step 1**: Check [`context.md`](file:///c:/Users/Administrator/Desktop/All%20projects/Linkal/context.md) first to pinpoint component locations, section IDs, and architectural patterns.
- **Step 2**: Use targeted slices (`view_file` with `StartLine` and `EndLine` covering only 20–50 lines) around target code.
- **Step 3**: Fall back to broader file reading **only** if debugging cross-file dependencies, race conditions, or unmapped logic.

### 2. Precision Edits over Massive Context Dumps
- For small block changes: Use `replace_file_content`.
- For complex, multi-section rewrites or structural reordering: Write and execute a dedicated Node.js script in `scratch/` directly on disk. This avoids streaming thousands of lines back and forth through model context.

### 3. Chained Terminal Pipeline Execution
- Group complementary terminal actions into a single command:
  ```powershell
  git add <files>; git commit -m "feat: description"; git push origin main; node verify.js
  ```
- This accomplishes 4 tasks in 1 single turn, saving 3 redundant model invocations.

### 4. Milestone-Based Fresh Chat Strategy
- As chat history grows past 20+ turns, every single turn resends the entire accumulated history, costing 50k–100k input tokens per message.
- Start a fresh chat session when moving between major milestones (e.g., transition from landing page design to Linkal Tool backend). The new chat reads `context.md` in 1 turn and starts with a clean ~3k token baseline.

### 5. Concise, Direct User Prompting
- Bullet points and clear instructions process in seconds with minimal token consumption.
- Audio messages are processed with multimodal embeddings; text bullet points are 5x more token-efficient for routine code edits.

### 6. Code Preservation & No Blind Guessing
- Never guess class names, variable names, or CSS IDs. Verify before editing.
- Preserve all existing comments, docstrings, and unrelated functions.
- If uncertain about file content, inspect the target lines rather than making assumptions.

### 7. Decoupled Media & Asset Management
- Never paste base64 encoded strings or large image binaries into HTML or chat context.
- Use vector SVGs, external URLs, or Cloudflare/Supabase CDN endpoints.

### 8. Fast Headless Verification over Heavy Emulation
- Verify deployments and status codes with lightweight HTTP requests (`node -e "fetch(...)"`) or CLI tests.
- Only launch heavy browser subagents when visual layout rendering or screenshot review is explicitly requested.

### 9. Milestone Documentation Updates Only
- Do not update `chat_history.md` or `context.md` on every small CSS or typo fix.
- Update documentation only upon completing a major feature, milestone, or architectural decision.

### 10. Idempotent Automation in `scratch/`
- Keep temporary automation scripts, test harnesses, and migration runners in `scratch/`.
- Ensure `scratch/` remains ignored by git via `.gitignore`.

### 11. Strict Pre-Commit Verification
- Always run `git status` or `git diff --stat` before committing to confirm that only intended files are changed and no files were accidentally deleted.

### 12. Component-Level Design Consistency
- Adhere strictly to Linkal design system tokens (`--navy: #0D1B3E`, `--blue: #1A56FF`, `'Plus Jakarta Sans'`).
- Avoid ad-hoc utility classes that clash with global styling.
