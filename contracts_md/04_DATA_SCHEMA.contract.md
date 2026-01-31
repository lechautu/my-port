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
