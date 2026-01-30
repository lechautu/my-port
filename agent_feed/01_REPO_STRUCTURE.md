# Repo & Directory Structure (Folder-based Database)

## App structure (recommended)
```
/ (repo)
  /public
    /docs
      /data
        index.json
      /projects
        proj-01/
          project.json
          cover.jpg
          /gallery
            01.jpg
            02.jpg
        proj-02/
          ...
  /src
    /components
    /lib
    App.tsx (or App.jsx)
    main.tsx (or main.jsx)
  index.html
  vite.config.ts (or vite.config.js)
  tailwind.config.*
  postcss.config.*
```

## Notes
- **All JSON and assets must live in `/public`** to be fetchable on GitHub Pages.
- The app fetches:
  - `docs/data/index.json` on mount
  - `docs/projects/<id>/project.json` when opening modal

## Base path (GitHub Pages)
When hosted at: `https://<user>.github.io/<repo>/`
- Set Vite `base` = `/<repo>/`
- Build output used by GitHub Pages must respect base URL.
