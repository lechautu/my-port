# UI/UX Spec (Tailwind-based)

## Visual System
- Use Tailwind **Slate** palette for neutral technical look.
- Light/Dark themes:
  - Background: `bg-slate-50` (light) / `bg-slate-950` (dark)
  - Cards: `bg-white` / `bg-slate-800`
  - Primary text: `text-slate-900` / `text-slate-100`
  - Secondary text: `text-slate-500` / `text-slate-400`
  - Accent: `blue-600` (buttons, links, active)
- Status colors:
  - Pinned: `yellow-400` (icon/badge)
  - NDA/Lock: `red-500` (icon)

## Typography & Shapes
- Font: system sans (Inter-like)
- Radius:
  - cards/modals: `rounded-xl`
  - buttons/tags: `rounded-full`
- Shadows:
  - resting: `shadow-sm`
  - hover: `shadow-xl`

## Interactions & Animations
- Project card hover:
  - lift: `-translate-y-1`
  - shadow increase
  - image zoom: `scale-105`
- Modal transition:
  - `animate-in fade-in zoom-in duration-200`
- Modal overlay:
  - `backdrop-blur-sm`
- Lightbox:
  - full screen overlay
  - keyboard support: `ESC` close, arrow keys navigate

## Layout Requirements
- Header: **sticky top**, includes:
  - Owner name, headline, social links
  - Search bar
  - Horizontal tag filter (scrollable)
- Grid:
  - responsive: 1 col (mobile), 2 cols (tablet), 3 cols (desktop)
- Modal:
  - internal scrollbar on mobile
  - body scroll locked behind modal
