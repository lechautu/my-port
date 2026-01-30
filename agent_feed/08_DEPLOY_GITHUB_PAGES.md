# Deploy to GitHub Pages (Vite)

## 1) Vite base config
Set base to repo name:
```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/<REPO_NAME>/"
});
```

## 2) Fetch URLs must respect base
Use:
- `const base = import.meta.env.BASE_URL;`
- fetch: `${base}docs/data/index.json`
- asset paths from JSON should already start with `docs/...` (public-root paths), so render with `${base}${path}`

## 3) Build & deploy
- `npm run build`
- Deploy `/dist` via:
  - GitHub Actions (recommended), or
  - gh-pages branch

## 4) Common pitfalls
- Hardcoding `/docs/...` (breaks under repo subpath)
- Missing base prefix in fetch/image URLs
