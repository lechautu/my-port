# Implementation Plan (Tasks for Agent)

## Phase 0 — Setup
- [ ] Create Vite React app
- [ ] Configure Tailwind CSS
- [ ] Install `lucide-react`
- [ ] Configure GitHub Pages base path in `vite.config`

## Phase 1 — Data Layer
- [ ] `fetchJson(url)` helper with error handling
- [ ] Fetch `docs/data/index.json` on mount
- [ ] Build derived `allTags` set from projects
- [ ] Soft validation:
  - if critical fields missing => show error UI

## Phase 2 — Grid & Filters
- [ ] Sticky header layout:
  - meta display + social links + search + tag filter
- [ ] Search filtering:
  - matches title/company/tags (case-insensitive)
- [ ] Tag multi-select filtering
- [ ] Sorting:
  - pinned desc
  - year desc
  - title asc
- [ ] ProjectCard UI:
  - hover lift + image zoom
  - pinned badge

## Phase 3 — Modal
- [ ] Open modal on card click
- [ ] Show loading skeleton while fetching detail
- [ ] Render:
  - role, tags, description paragraphs
  - responsibilities bullets
  - highlights (optional)
  - links list (optional)
  - NDA state
- [ ] Close behaviors (X/overlay/ESC) + body scroll lock

## Phase 4 — Gallery & Lightbox
- [ ] Render gallery grid (unless NDA)
- [ ] Lightbox overlay with keyboard navigation
- [ ] Prev/next buttons, close, overlay click

## Phase 5 — Responsive & Polish
- [ ] Grid breakpoints: 1/2/3 cols
- [ ] Modal internal scroll on mobile
- [ ] Empty state for filtering results
- [ ] Error states:
  - index fetch fail -> retry
  - project fetch fail -> modal error + close option

## Phase 6 — Deploy
- [ ] GitHub Pages build output
- [ ] Verify base path fetch works under `/<repo>/`
- [ ] Smoke test on iOS Safari + Chrome
