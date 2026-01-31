<!--
CONTRACT FILE
- Target: IDE coding agent (VS Code) implementing the portfolio site.
- Priority: Obey requirements exactly; if conflict, resolve using this precedence:
  PRD > UI/UX Contract > Tech Spec Contract.
- Default: Implement MVP first, keep V2 items behind a flag or TODO.
-->
# Tech Spec Contract — JSON-Folder Portfolio Showcase (GitHub Pages)

# Tech Doc — JSON-Folder Portfolio Showcase (GitHub Pages)

> Updated to match latest PRD + UI/UX direction (JSON-folder data system + glassmorphic dark mode).

## 1) Scope
A static portfolio site hosted on **GitHub Pages**. Projects are **data-driven** via:
- `projects/index.json` (manifest)
- `projects/<id>/project.json` (per-project content)
- `cover.webp` + `gallery/*.webp` assets

Primary UX: **Landing → Projects Grid → Project Detail Modal** (MVP). Optional deep-link routing (V2).

---

## 2) Goals & Non-goals
### Goals
- “Wow” visual polish (animations, hover, glassmorphism) while staying readable and fast.
- Add/update projects by editing JSON + dropping assets.
- Reliable static deploy on GitHub Pages.
- Clear recruiter-friendly content (role, responsibilities, impact, links).

### Non-goals
- In-browser CMS/editor.
- Backend / database / auth.

---

## 3) Recommended Tech Stack
This doc assumes **React + Vite + Tailwind** (matches UI/UX plan). You can swap to vanilla later without changing data format.

### 3.1 Core
- **React 18 + Vite** (fast dev/build)
- **TypeScript** (recommended)
- **Tailwind CSS** (glassmorphic dark UI)

### 3.2 UI / Animation
- **Framer Motion** (modal transitions + scroll reveals)
- Optional: **IntersectionObserver** (if you want zero libs for scroll reveal)

### 3.3 Data Validation
- Optional: **Zod** for runtime schema validation (prevent bad JSON breaking UI)

### 3.4 Routing
- MVP: modal only (no route change)
- V2: **hash routing** `/#/project/<id>` (best compatibility with GitHub Pages)

---

## 4) Information Architecture
### Pages / Views
1. **Home/Landing**
   - Hero (name, headline, location)
   - Quick links (LinkedIn/GitHub/email)
   - CTA “View Projects” (scroll to grid)

2. **Projects Grid**
   - Card list from manifest + project.json
   - Optional filter chips + search input (V2)

3. **Project Detail Modal**
   - Title + studio + period
   - Summary + Description
   - Responsibilities (bullets)
   - Tech stack (chips)
   - Highlights (badges)
   - Links (store/demo/video)
   - Gallery carousel/lightbox (keyboard support)

---

## 5) Data System
### 5.1 Folder Layout (GitHub Pages compatible)
**Option A (recommended for Vite):**
```
repo/
  public/
    projects/
      index.json
      magic-tiles-3/
        project.json
        cover.webp
        gallery/
          01.webp
          02.webp
  src/
  ...
```
In runtime, fetch paths are relative to the site root:
- `/projects/index.json`
- `/projects/<id>/project.json`
- `/projects/<id>/cover.webp`

### 5.2 Loading Strategy
1. Fetch manifest `projects/index.json`
2. Fetch each project JSON in parallel with throttling (avoid 30+ concurrent requests)
3. Sort:
   1) `featured: true` first
   2) `order` desc
   3) `period.from` desc
4. Render cards with skeleton loading

### 5.3 Fault Tolerance
- If one project fails to load: show a non-blocking “Failed to load project” card and continue.
- Missing optional fields must never crash UI.

### 5.4 Schema & Validation
- Keep schema identical to PRD.
- If using Zod: validate manifest + project JSON; on failure, log to console and display fallback.

---

## 6) UI Implementation Notes (match UI/UX)
### 6.1 Visual Style
- **Glassmorphic Dark Mode**
  - Background: slate-950
  - Accents: cyan-400, purple-500
  - Components: `bg-white/5`, `backdrop-blur`, subtle border `border-white/10`
  - Hover glow: `shadow` + `ring` accent
- Typography: Inter/System UI; large bold headings; gradient text for hero headings.
- Hero subtle parallax background (light motion only).

### 6.2 Components
- `AppShell` (layout + background)
- `HeroSection`
- `ProjectGrid`
- `ProjectCard`
- `ProjectModal`
- `GalleryCarousel` (or `GalleryLightbox`)
- `TagChips` + `SearchBox` (V2)

### 6.3 Accessibility
- Modal:
  - ESC closes
  - Focus trap inside modal
  - Close button reachable by keyboard
  - Overlay click closes
- Gallery:
  - Left/Right arrow navigation
  - `alt` text per image
- Color contrast: ensure readable text on glass panels.

---

## 7) State & Data Flow
### 7.1 State
- `projects[]`: loaded project models
- `selectedProjectId`: modal open state
- `filters/search`: (V2)
- `isLoading`, `loadErrors[]`

### 7.2 Data Model (Types)
- `Manifest { version: number; projects: {id, path}[] }`
- `Project` matches PRD fields

---

## 8) Performance Plan
- Convert images to **.webp**; keep cover under ~200–400KB when possible.
- Lazy-load gallery images; only load first 1–2 above-the-fold.
- Preload cover images for featured projects.
- Code-splitting: load `ProjectModal` and gallery code on demand.
- Avoid heavy animation on mobile; reduce motion when user prefers reduced motion.

Target: Lighthouse Desktop ≥ 90 (Performance + Best Practices).

---

## 9) Deployment (GitHub Pages)
### 9.1 Build & Deploy
- GitHub Pages using **GitHub Actions** (recommended) or manual deploy.
- For Vite, set `base` correctly:
  - If repo is `username.github.io/my-port`, base should be `/my-port/`.

### 9.2 Routing Strategy
- MVP: no routing.
- V2 deep link: prefer **hash routing** so direct links work on GitHub Pages:
  - `/#/project/magic-tiles-3`

---

## 10) Optional: Manifest Auto-Generation
Because GitHub Pages cannot list directories at runtime, you can auto-generate `projects/index.json` with:
- Local script (Node) run before commit
- Or GitHub Action step before build

Script behavior:
- Scan `public/projects/*/project.json`
- Output `public/projects/index.json`
- Ensure stable ordering + unique ids

---

## 11) Milestones
### MVP
1. Repo scaffold (Vite + Tailwind)
2. Base layout + Hero section
3. Data loader (manifest + per-project JSON)
4. Projects grid + cards
5. Project detail modal
6. Gallery carousel + keyboard controls
7. Animations (hover + scroll reveal)
8. Deploy to GitHub Pages

### V2
1. Hash routing deep links
2. Filter/search
3. Featured pinning + next/prev navigation
4. Manifest generation script + CI
5. i18n (EN/VN fields)

---

## 12) Task Breakdown (Checklist)
### A) Foundation
- [ ] Create Vite React TS project
- [ ] Add Tailwind + base theme tokens
- [ ] Set global layout (background, container, spacing)

### B) Data Layer
- [ ] Define TS types for Manifest/Project
- [ ] Implement `fetchManifest()`
- [ ] Implement `fetchProject(path)`
- [ ] Add concurrency limit + error handling
- [ ] Sorting logic (featured/order/period)
- [ ] Optional: Zod validation + fallback

### C) UI — Home/Grid
- [ ] Hero (name/headline/location/links)
- [ ] CTA scroll to projects
- [ ] ProjectGrid skeleton state
- [ ] ProjectCard layout (cover/title/studio/tags/summary)
- [ ] Hover effects (lift/tilt + glow)

### D) UI — Modal + Gallery
- [ ] Modal open/close transitions
- [ ] ESC + overlay click to close
- [ ] Focus trap + accessibility attributes
- [ ] Detail layout blocks (desc/responsibilities/tech/highlights/links)
- [ ] Gallery carousel
- [ ] Arrow key navigation + swipe (mobile)

### E) Animation & Polish
- [ ] Scroll reveal (Framer Motion or IntersectionObserver)
- [ ] Subtle hero parallax
- [ ] Reduced motion handling

### F) Performance
- [ ] Lazy-load images
- [ ] Preload featured covers
- [ ] Bundle analyze (optional)

### G) Deploy
- [ ] Configure Vite base path
- [ ] GitHub Action deploy to Pages
- [ ] Smoke test on mobile/desktop

### H) V2 (Optional)
- [ ] Hash routing `/project/:id`
- [ ] Search + tag filters
- [ ] Next/Prev project navigation
- [ ] Manifest auto-generation script
- [ ] Language toggle (EN/VN)

---

## 13) Acceptance Criteria (MVP)
- Site loads on GitHub Pages.
- Projects render from JSON (no hardcoded project content).
- Clicking a project opens modal with gallery and responsibilities.
- ESC closes modal; keyboard navigation works in gallery.
- Animations present but do not block interaction.
- Adding a project folder + updating manifest makes it appear.
