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
