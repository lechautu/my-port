<!--
CONTRACT FILE
- Target: IDE coding agent (VS Code) implementing the portfolio site.
- Priority: Obey requirements exactly; if conflict, resolve using this precedence:
  PRD > UI/UX Contract > Tech Spec Contract.
- Default: Implement MVP first, keep V2 items behind a flag or TODO.
-->
# Deploy Contract — GitHub Pages (Vite)

## Required
- Deploy to GitHub Pages for repo path: `username.github.io/my-port/`
- Vite config must set:
  - `base: "/my-port/"`

## Recommended: GitHub Actions
- Build with `npm ci` then `npm run build`
- Publish `dist/` to GitHub Pages

## Routing Note
- MVP uses modal only (no routing).
- If enabling deep links, prefer **hash routing** so refresh works on GitHub Pages:
  - `/#/project/<id>`
