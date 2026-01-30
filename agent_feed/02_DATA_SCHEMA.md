# Data Schema (JSON Contracts)

## 1) `public/docs/data/index.json`
Used to render the grid and header meta.

### Schema
```json
{
  "meta": {
    "ownerName": "String",
    "headline": "String",
    "location": "String",
    "links": { "github": "url", "linkedin": "url", "email": "mailto:..." }
  },
  "projects": [
    {
      "id": "unique-id",
      "path": "projects/unique-id",
      "title": "String",
      "company": "String",
      "tags": ["Tag1", "Tag2"],
      "cover": "docs/projects/unique-id/cover.jpg",
      "year": 2024,
      "pinned": true
    }
  ]
}
```

### Rules
- `id` must match folder name under `public/docs/projects/<id>/`
- `path` is folder path (no `project.json` in the index schema).
- `cover` should be a path from public root.

## 2) `public/docs/projects/<id>/project.json`
Used by modal detail.

### Schema
```json
{
  "id": "unique-id",
  "title": "String",
  "company": "String",
  "role": "String",
  "period": "String",
  "tags": ["Tag1", "Tag2"],
  "description": ["Paragraph 1", "Paragraph 2"],
  "responsibilities": ["Bullet point 1", "Bullet point 2"],
  "highlights": [{ "label": "Metric", "value": "Value" }],
  "links": [{ "type": "store", "url": "...", "label": "App Store" }],
  "nda": { "isNDA": true, "note": "Optional custom message" },
  "gallery": [
    "docs/projects/unique-id/gallery/01.jpg",
    "docs/projects/unique-id/gallery/02.jpg"
  ]
}
```

### Rules
- If `nda.isNDA === true`:
  - Hide gallery UI and show a protected placeholder + note.
- Fields `highlights` and `links` are optional: render conditionally.

## Edge Cases
- Missing optional arrays => treat as empty.
- Empty strings in links => filter out.
