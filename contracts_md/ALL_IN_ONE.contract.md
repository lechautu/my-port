<!--
CONTRACT FILE
- Target: IDE coding agent (VS Code) implementing the portfolio site.
- Priority: Obey requirements exactly; if conflict, resolve using this precedence:
  PRD > UI/UX Contract > Tech Spec Contract.
- Default: Implement MVP first, keep V2 items behind a flag or TODO.
-->
# All-in-one Contract — JSON-Folder Portfolio Showcase

## Files included

- PRD
- UI/UX
- Tech Spec
- Data Schema
- Tasks
- Deploy
- DoD


---

## PRD
# PRD — JSON-Folder Portfolio Showcase (GitHub Pages)

## 1. Overview

Build a static, “wow” portfolio + project showcase website hosted on GitHub Pages. Each project lives in its own folder containing a `project.json` configuration file and image/video assets for a gallery. The website reads a manifest `projects/index.json` to render an animated grid of projects and a detailed project view (modal/route). Adding a new project should be as simple as adding a folder and updating (or auto-generating) the manifest.

## 2. Goals

* **Showcase quality**: Visually impressive, animation-rich UI while remaining fast and readable.
* **Easy to extend**: Add/update projects by editing JSON and dropping assets into the project folder.
* **Static hosting**: Deploy on **GitHub Pages** (no server, no database).
* **Credibility**: Present clear project description + responsibilities, tech stack, impact/highlights, and links.

## 3. Non-goals

* Admin UI for editing projects in-browser.
* CMS, database, authentication.
* Heavy frameworks required to function (keep it “web thuần”).

## 4. Target Users

### 4.1 Recruiters / Hiring Managers

* Needs: quick scanning, confidence in scope/impact, see visuals.
* Behaviors: spend 30–120 seconds on page; click 1–3 projects.

### 4.2 Game/App Dev peers

* Needs: deeper technical details, role clarity, links.

### 4.3 Owner (You)

* Needs: simple content maintenance; no build pipeline required (optional script allowed).

## 5. Success Metrics

* **Performance**: Lighthouse ≥ 90 for Performance and Best Practices on desktop.
* **UX**: First meaningful content within ~1–2s on broadband.
* **Maintenance**: Adding a project takes ≤ 5 minutes.
* **Engagement**: Recruiters can access project details in ≤ 2 clicks.

## 6. Key Features

### 6.1 Home / Landing

**Must-have**

* Hero section: name, headline, location, quick links (LinkedIn/GitHub/email).
* Primary CTA: “View Projects”.
* Sub-hero: short 2–3 line intro (product-focused, Unity/game/app focus).

**Nice-to-have**

* Subtle animated background (noise gradient / parallax)

### 6.2 Projects Grid

**Must-have**

* Grid of project cards loaded from `projects/index.json`.
* Each card shows:

  * Cover image
  * Project title
  * Studio/company
  * Platform tags (e.g., iOS/Android/WebGL/visionOS)
  * Short summary (1 line)
* Interactions:

  * Hover animation (tilt/lift)
  * Click opens Project Detail

**Nice-to-have**

* Filters by tags/platform
* Search by title/studio
* Featured projects pinned or highlighted

### 6.3 Project Detail View

**Must-have**

* Opens as **modal** (MVP) and supports direct deep link (V2: route `/project/<id>`)
* Content blocks:

  * Title + studio + period
  * Summary / Description
  * Responsibilities (bullet list)
  * Tech stack (chips)
  * Highlights / impact (metrics badges)
  * Links (store/demo/video)
  * Gallery (carousel / lightbox)
* Controls:

  * Close (ESC, click overlay)
  * Keyboard navigation for gallery (left/right)

**Nice-to-have**

* Next/previous project navigation
* Share button (copy deep link)

### 6.4 Data System (JSON + Folder per Project)

**Must-have**

* Static manifest: `projects/index.json` listing project JSON paths.
* Each project folder contains:

  * `project.json`
  * `cover.webp`
  * `gallery/` images
* Data loader:

  * Fetch manifest
  * Fetch each `project.json`
  * Render sorted by `order` / `featured` / `period`

**Nice-to-have**

* Optional Node script to auto-generate manifest (local or GitHub Action)

### 6.5 Animations & Visual Polish

**Must-have**

* Scroll reveal for sections/cards
* Smooth modal open/close
* Micro-interactions (buttons, links)

**Nice-to-have**

* Parallax hero or gradient motion
* Animated counters for highlights

### 6.6 Accessibility & Internationalization

**Must-have**

* Keyboard accessible modal
* Image `alt` text
* Sufficient contrast

**Nice-to-have**

* Language toggle (EN/VN) via JSON fields

## 7. User Stories

### Recruiter

* As a recruiter, I want to quickly scan a grid of projects and open details, so I can assess fit.
* As a recruiter, I want to see responsibilities and impact, so I can understand ownership.

### Owner

* As the owner, I want to add a project by dropping a folder with JSON + images, so I can maintain content fast.
* As the owner, I want to host on GitHub Pages without server setup.

## 8. Functional Requirements

### 8.1 Routing

* MVP: modal-only detail (URL stays on `/`).
* V2: enable deep link:

  * `/#/project/<id>` (hash routing) OR `/project/<id>` (if using SPA fallback).

### 8.2 Sorting

* Default order:

  1. `featured: true` first
  2. then `order` desc
  3. then `period.from` desc

### 8.3 Data Validation

* If a project fails to load, show a non-blocking warning card and continue.
* Missing optional fields should not break rendering.

### 8.4 Media Handling

* Prefer `.webp`.
* Lazy-load gallery images.
* Preload cover for featured items.

## 9. Data Schemas

### 9.1 Manifest `projects/index.json`

```json
{
  "version": 1,
  "projects": [
    { "id": "magic-tiles-3", "path": "projects/magic-tiles-3/project.json" }
  ]
}
```

### 9.2 Project `projects/<id>/project.json`

```json
{
  "id": "magic-tiles-3",
  "title": "Magic Tiles 3",
  "studio": "Amanotes",
  "type": "Mobile Rhythm Game",
  "period": { "from": "2020-05", "to": "2025-05" },
  "platforms": ["iOS", "Android"],
  "roleTitle": "Unity Developer",
  "summary": "1-line hook for card.",
  "description": "Longer paragraph(s) for detail view.",
  "responsibilities": [
    "Built feature X",
    "Optimized Y"
  ],
  "tech": ["Unity", "C#"],
  "highlights": [
    { "label": "Impact", "value": "Reduced load time" }
  ],
  "links": [
    { "label": "Google Play", "url": "https://..." }
  ],
  "media": {
    "cover": "cover.webp",
    "gallery": ["gallery/01.webp", "gallery/02.webp"]
  },
  "tags": ["rhythm", "live-ops"],
  "featured": true,
  "order": 10
}
```

## 10. Non-functional Requirements

* **Performance**: avoid large JS bundles; code-split optional.
* **Reliability**: no runtime errors if a project is missing optional fields.
* **Maintainability**: clear folder conventions and documented schema.
* **SEO**: basic meta tags; V2 deep links improve shareability.

## 11. Milestones

### MVP (Release 1)

1. Repo scaffold (HTML/CSS/JS)
2. Data loader (manifest + project JSON)
3. Projects grid + cards
4. Project detail modal + gallery
5. Animations (hover + scroll reveal)
6. GitHub Pages deploy

### V2

1. Hash routing deep links
2. Filter/search
3. About/Skills/Timeline sections
4. Auto-generate manifest script + CI

## 12. Dependencies & Constraints

* GitHub Pages is static; cannot list directories at runtime.
* Need a manifest (or build step) to discover projects.
* Images should be optimized for web.

## 13. Risks & Mitigations

* **Large media slows load** → enforce `.webp`, lazy-load, compress.
* **Manual manifest update error-prone** → optional script generation.
* **Animation overuse** → keep subtle, prioritize clarity.

## 14. Acceptance Criteria

* Site loads successfully on GitHub Pages.
* Projects render from JSON without hardcoding.
* Adding a project folder + updating manifest makes it appear.
* Clicking a project opens detail with gallery and responsibilities.
* Keyboard ESC closes modal; focus is manageable.
* Animations present but do not block interaction.


---

## UI/UX
# UI/UX Contract — Portfolio Showcase (Glassmorphic Dark Mode)

> Source: UI/UX design doc (PDF). Converted to an implementation-oriented contract.

## 1) Overview
Xây dựng một trang web portfolio tĩnh (static website) lưu trữ trên GitHub Pages. Mục tiêu là tạo
ra một trải nghiệm "Wow" về mặt thị giác cho người xem (Recruiters, Hiring Managers) trong khi
vẫn giữ quy trình cập nhật nội dung cực kỳ đơn giản cho lập trình viên thông qua các tệp JSON
và thư mục.

## 2) Visual Style
- Theme: **Glassmorphic Dark Mode**
- Background: **slate-950**
- Accent colors: **cyan-400**, **purple-500**
- Effects:
  - Glassmorphism: `backdrop-blur` + panels semi-transparent
  - Glow on hover (subtle)
  - Parallax / subtle background motion in Hero
- Typography:
  - Font: **Inter** (or System UI)
  - Headings: bold, large, **gradient text**

## 3) UX Journey
1. **Land**: Hero shows name/role + lời chào ấn tượng. Clear CTA “Xem Dự Án”.
2. **Scan**: Projects grid with strong covers. Hover makes cards lift/tilt.
3. **Deep Dive**: Click opens modal instantly (no page reload). Gallery + tech stack + links.
4. **Exit**: Close modal with **ESC** or click outside.

## 4) Key UX Features
- JSON-driven content loading (`project.json`)
- Gallery carousel inside modal supports **arrow keys**
- Fully responsive (mobile + desktop)

## 5) Data Architecture (UI-facing)
Expected static structure:
```
/public
  /projects
    index.json            # manifest
    /<project-id>
      project.json
      cover.webp
      /gallery
        01.webp
```

## 6) Development Phases (UX-first)
1. MVP: React shell + Tailwind theme + basic animations + mock data
2. Integration: real JSON fetch from `/public/projects`
3. Deploy: GitHub Pages

## 7) UI Components (MVP)
- App Shell (background, container)
- Hero Section (headline, links, CTA, parallax background)
- Projects Grid
- Project Card (cover/title/studio/tags/summary + hover glow/lift)
- Project Detail Modal (close, focus, content blocks)
- Gallery Carousel (keyboard navigation)

## 8) Accessibility
- Modal is keyboard-accessible (ESC to close; focus stays inside modal)
- Images have `alt` text
- Ensure readable contrast on glass panels


---

## Tech Spec
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


---

## Data Schema
<!--
CONTRACT FILE
- Target: IDE coding agent (VS Code) implementing the portfolio site.
- Priority: Obey requirements exactly; if conflict, resolve using this precedence:
  PRD > UI/UX Contract > Tech Spec Contract.
- Default: Implement MVP first, keep V2 items behind a flag or TODO.
-->
# Data Schema Contract — JSON-Folder Project System

## Folder Layout (Required)
```
public/
  projects/
    index.json
    <project-id>/
      project.json
      cover.webp
      gallery/
        01.webp
        02.webp
```

## Manifest: `public/projects/index.json`
- Required fields:
  - `version` (number)
  - `projects` array of objects with: `id`, `path`
- Example:
```json
{
  "version": 1,
  "projects": [
    { "id": "magic-tiles-3", "path": "projects/magic-tiles-3/project.json" }
  ]
}
```

## Project: `public/projects/<id>/project.json`
### Required fields
- `id` (string) — must match folder name
- `title` (string)
- `studio` (string)
- `period` (object) — `{ "from": "YYYY-MM", "to": "YYYY-MM" | null }`
- `platforms` (string[])
- `roleTitle` (string)
- `summary` (string) — 1-line hook used in card
- `description` (string) — long text shown in modal
- `responsibilities` (string[]) — bullet list
- `tech` (string[]) — chips
- `media.cover` (string) — e.g. `cover.webp`
- `media.gallery` (string[]) — e.g. `gallery/01.webp`

### Optional fields
- `type` (string)
- `highlights` array of `{ "label": "string", "value": "string" }`
- `links` array of `{ "label": "string", "url": "string" }`
- `tags` (string[])
- `featured` (boolean)
- `order` (number)

### Example
```json
{
  "id": "magic-tiles-3",
  "title": "Magic Tiles 3",
  "studio": "Amanotes",
  "type": "Mobile Rhythm Game",
  "period": { "from": "2020-05", "to": "2025-05" },
  "platforms": ["iOS", "Android"],
  "roleTitle": "Unity Developer",
  "summary": "1-line hook for card.",
  "description": "Longer paragraph(s) for detail view.",
  "responsibilities": ["Built feature X", "Optimized Y"],
  "tech": ["Unity", "C#"],
  "highlights": [{ "label": "Impact", "value": "Reduced load time" }],
  "links": [{ "label": "Google Play", "url": "https://..." }],
  "media": {
    "cover": "cover.webp",
    "gallery": ["gallery/01.webp", "gallery/02.webp"]
  },
  "tags": ["rhythm", "live-ops"],
  "featured": true,
  "order": 10
}
```

## Sorting Rules (Required)
Default sort:
1. `featured: true` first
2. `order` desc
3. `period.from` desc

## Fault Tolerance (Required)
- If a project JSON fails to load: show a non-blocking warning card and continue.
- Missing optional fields must not crash UI.


---

## Tasks
<!--
CONTRACT FILE
- Target: IDE coding agent (VS Code) implementing the portfolio site.
- Priority: Obey requirements exactly; if conflict, resolve using this precedence:
  PRD > UI/UX Contract > Tech Spec Contract.
- Default: Implement MVP first, keep V2 items behind a flag or TODO.
-->
# Tasks Contract — MVP then V2

## MVP (Release 1)
### 1) Scaffold
- [ ] Create Vite + React + TS app
- [ ] Install Tailwind, set global theme tokens (slate-950, cyan-400, purple-500)
- [ ] App shell background (glassmorphic base)

### 2) Data Layer
- [ ] Types: Manifest + Project (match schema)
- [ ] Loader: fetch `/projects/index.json`
- [ ] Loader: fetch each `project.json` with concurrency limit
- [ ] Sort rules (featured/order/period)
- [ ] Error handling: per-project failure card

### 3) UI — Landing
- [ ] Hero: name/role/location + links (LinkedIn/GitHub/email)
- [ ] CTA “View Projects” scroll to grid
- [ ] Subtle hero motion / parallax

### 4) UI — Projects Grid
- [ ] Grid layout responsive
- [ ] ProjectCard: cover, title, studio, platform tags, summary
- [ ] Hover micro-interactions: lift/tilt + glow

### 5) UI — Project Modal
- [ ] Modal open/close animation
- [ ] Close by ESC + overlay click + close button
- [ ] Focus trap (accessibility)
- [ ] Render content blocks: period, description, responsibilities, tech chips, highlights, links

### 6) Gallery
- [ ] Carousel in modal
- [ ] Arrow key navigation (left/right)
- [ ] Lazy-load gallery images

### 7) Performance
- [ ] `.webp` usage; image sizes optimized
- [ ] Code-splitting (modal/gallery) optional

### 8) Deploy
- [ ] Vite `base` = `/my-port/`
- [ ] GitHub Actions deploy to Pages
- [ ] Smoke test desktop + mobile

## V2 (Optional)
- [ ] Hash routing `/#/project/<id>` deep links
- [ ] Search + tag/platform filters
- [ ] Next/Prev project navigation
- [ ] Manifest auto-generation script (CI)
- [ ] Language toggle (EN/VN fields)


---

## Deploy
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


---

## Definition of Done
<!--
CONTRACT FILE
- Target: IDE coding agent (VS Code) implementing the portfolio site.
- Priority: Obey requirements exactly; if conflict, resolve using this precedence:
  PRD > UI/UX Contract > Tech Spec Contract.
- Default: Implement MVP first, keep V2 items behind a flag or TODO.
-->
# Definition of Done (DoD) Contract — MVP

A build is **DONE** when all are true:

## Functional
- [ ] Home loads with hero + CTA
- [ ] Projects grid is rendered from JSON (no hardcoded project content)
- [ ] Clicking a card opens modal with correct details + gallery
- [ ] ESC closes modal; overlay click closes modal
- [ ] Gallery supports left/right arrow navigation
- [ ] Missing optional fields do not crash UI
- [ ] If one project fails to load, page still works and shows warning card

## Visual / UX
- [ ] Glassmorphic dark theme matches UI/UX contract
- [ ] Hover lift/tilt + glow on cards
- [ ] Modal transitions are smooth
- [ ] Responsive on mobile and desktop

## Performance
- [ ] Images are `.webp` and lazy-loaded for gallery
- [ ] No obvious jank on scroll/hover

## Deploy
- [ ] Site works on GitHub Pages under `/my-port/`
