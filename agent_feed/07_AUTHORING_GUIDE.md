# Authoring Guide — Adding a New Project

## 1) Create folder
`public/docs/projects/<id>/`

## 2) Add files
- `public/docs/projects/<id>/project.json`
- `public/docs/projects/<id>/cover.jpg`
- `public/docs/projects/<id>/gallery/01.jpg` etc.

## 3) Update index
Edit `public/docs/data/index.json` and append:
```json
{
  "id": "<id>",
  "path": "projects/<id>",
  "title": "...",
  "company": "...",
  "tags": ["Unity", "Mobile"],
  "cover": "docs/projects/<id>/cover.jpg",
  "year": 2025,
  "pinned": false
}
```

## 4) NDA mode
In `project.json`:
```json
"nda": { "isNDA": true, "note": "Screenshots are confidential." }
```

## 5) Image optimization
- Prefer WebP where possible
- Keep cover around ~1280px wide
- Keep gallery images reasonable (avoid multi-MB)
