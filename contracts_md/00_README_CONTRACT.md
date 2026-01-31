<!--
CONTRACT FILE
- Target: IDE coding agent (VS Code) implementing the portfolio site.
- Priority: Obey requirements exactly; if conflict, resolve using this precedence:
  PRD > UI/UX Contract > Tech Spec Contract.
- Default: Implement MVP first, keep V2 items behind a flag or TODO.
-->
# Contract Pack — JSON-Folder Portfolio Showcase

This folder contains **implementation contracts** for a coding agent.
Use these files in order:

1. `01_PRD.contract.md` — product requirements & acceptance criteria
2. `02_UIUX.contract.md` — visual/UX rules (glassmorphic dark mode)
3. `03_TECH_SPEC.contract.md` — architecture, data loading, performance, deploy
4. `04_DATA_SCHEMA.contract.md` — JSON schema + folder layout + examples
5. `05_TASKS.contract.md` — ordered checklist for MVP and V2
6. `06_DEPLOY.contract.md` — GitHub Pages deployment notes
7. `07_DEFINITION_OF_DONE.contract.md` — testing & completion criteria

## Implementation Guardrails
- Content must be **JSON-driven** (no hardcoded projects).
- Modal must support **ESC** close and keyboard gallery navigation.
- Must work on **GitHub Pages** under `/my-port/` base path.
- Keep animations **subtle** and performance-friendly.
