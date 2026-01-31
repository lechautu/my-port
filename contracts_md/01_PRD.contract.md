<!--
CONTRACT FILE
- Target: IDE coding agent (VS Code) implementing the portfolio site.
- Priority: Obey requirements exactly; if conflict, resolve using this precedence:
  PRD > UI/UX Contract > Tech Spec Contract.
- Default: Implement MVP first, keep V2 items behind a flag or TODO.
-->
# PRD Contract — JSON-Folder Portfolio Showcase (GitHub Pages)

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
