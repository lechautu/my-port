# Test Plan

## Functional
- [ ] Landing loads and renders meta + grid
- [ ] Sorting pinned first, then year desc
- [ ] Search matches title/company/tags (case-insensitive)
- [ ] Multi-tag selection works (toggle on/off)
- [ ] Empty state shown when no results
- [ ] Clicking card opens modal
- [ ] Modal shows loading state then renders detail
- [ ] Modal closes via:
  - close button
  - overlay click
  - ESC
- [ ] Body scroll locked while modal open
- [ ] NDA hides gallery and shows protected placeholder + note
- [ ] Lightbox:
  - opens on image click
  - arrows navigate
  - ESC closes
  - overlay click closes

## Data Robustness
- [ ] Missing `highlights` doesn't crash
- [ ] Missing `links` doesn't crash
- [ ] Missing `gallery` doesn't crash (show empty message or hide section)

## Hosting (GitHub Pages)
- [ ] Works when deployed at `https://<user>.github.io/<repo>/`
- [ ] All fetch URLs resolve correctly with base path
- [ ] Images load correctly from `public/docs/...`
