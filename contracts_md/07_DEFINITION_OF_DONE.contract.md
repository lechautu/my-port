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
