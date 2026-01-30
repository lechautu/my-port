# Component Requirements & Behaviors

## 1) App (Main Container)
### Responsibilities
- Fetch `docs/data/index.json` on mount.
- Store `meta`, `projects`.
- Client-side:
  - filter by search (title/company)
  - filter by selected tags
  - sort pinned first, then `year` desc

### UI Structure
- Sticky header:
  - ownerName + headline
  - social links (GitHub/LinkedIn/Email)
  - search input
  - tag filter row (h-scroll)
- Grid section
- Conditional modal + lightbox portals

## 2) ProjectCard
### Display
- Cover image (aspect-video)
- Title
- Company + Year
- Top 3 tags
- Pinned badge if `pinned === true`

### Interaction
- Click => open ProjectModal (by `id` or by folder `path`)

## 3) ProjectModal
### Fetching
- On open:
  - fetch `docs/${project.path}/project.json` OR compute from `id`
  - show loading state (spinner/skeleton)

### Layout
- Header row:
  - Title
  - NDA lock icon if `nda.isNDA`
  - Close button
- Content:
  - Left column: role, tags, description, responsibilities, external links
  - Right column: gallery grid (hidden if NDA)

### NDA Mode
If `nda.isNDA === true`:
- hide gallery
- show placeholder box “Protected/Confidential”
- show optional `nda.note`

### Close behavior
- Close button, overlay click, ESC key
- lock body scroll while open

## 4) Lightbox
### Trigger
- clicking an image in modal gallery

### UI
- black overlay (95% opacity)
- image centered (contain)
- prev/next buttons + close button

### Keyboard
- ArrowLeft/ArrowRight: navigate
- Escape: close
