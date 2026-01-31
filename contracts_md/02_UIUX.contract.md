<!--
CONTRACT FILE
- Target: IDE coding agent (VS Code) implementing the portfolio site.
- Priority: Obey requirements exactly; if conflict, resolve using this precedence:
  PRD > UI/UX Contract > Tech Spec Contract.
- Default: Implement MVP first, keep V2 items behind a flag or TODO.
-->
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
