# Web Portfolio Showcase — Agent Implementation Pack

## Goal
Build a **static portfolio showcase** hosted on **GitHub Pages** using:
- **React + Vite**
- **Tailwind CSS**
- **lucide-react** icons
- Data loaded from **static JSON files** following a **folder-based database** pattern.

## Core Principle
**Each project lives in its own folder** with:
- `project.json` (detail for modal)
- `cover.jpg`
- `gallery/*`

A global `index.json` provides list/grid data.

## Source of Truth
- `public/docs/data/index.json` (meta + project list for grid)
- `public/docs/projects/<id>/project.json` (detail for modal)

## Key Features (MVP)
- Sticky header: owner info + social links + search + horizontal tag filter
- Project grid (responsive)
- Filtering (search + tags), sorting (pinned first, then year desc)
- Project modal (lazy fetch project.json), NDA mode
- Lightbox (keyboard support)

## Constraints
- Must work under GitHub Pages repo subpath.
- JSON/image paths must be handled correctly (relative vs base concatenation).
- Missing optional fields must not crash the UI.

## Deliverables
- React app implementing UI/UX guidelines and components spec.
- Data folder structure under `public/docs/`.

## Quick Start (Agent)
1. `npm create vite@latest` (react)
2. Install deps: `tailwindcss`, `lucide-react`
3. Implement components per `03_COMPONENT_SPEC.md`
4. Ensure fetch uses `import.meta.env.BASE_URL`

See other docs:
- `01_REPO_STRUCTURE.md`
- `02_DATA_SCHEMA.md`
- `03_UIUX_SPEC.md`
- `04_COMPONENT_SPEC.md`
- `05_IMPLEMENTATION_PLAN.md`
- `06_TEST_PLAN.md`
- `07_AUTHORING_GUIDE.md`
- `08_DEPLOY_GITHUB_PAGES.md`
