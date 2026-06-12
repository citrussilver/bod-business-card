# works_v3 Carousel

How the Bread Byte–inspired project carousel in `works_v3.html` works.

## Big picture

A **50/50 split screen**: text on the left, a fixed image mosaic on the right. There are **4 slides** (4 projects). On change, everything moves in sync — but the left and right sides animate differently.

```
┌─────────────────┬──────────────────────────┐
│  TEXT PANEL     │  GALLERY (fixed layout)  │
│  slides left ←  │  [overlap] [    top    ] │
│                 │  [      bottom         ] │
│                 │         [ ◄ ► ]          │
└─────────────────┴──────────────────────────┘
```

## The core idea

The mosaic **does not move**. Only the **content inside each frame** slides.

Think of it as **4 synchronized film strips**:

- 1 text strip (left panel)
- 3 image strips (overlap, top, bottom tiles)

Each strip has 4 frames lined up horizontally. On "next", all 4 strips shift left by one frame at the same time.

## HTML structure

| Part | What it holds |
|------|----------------|
| `.text-panel .track-inner` | 4 `.text-slide` articles |
| `.tile--overlap .track-inner` | 4 images (one per project) |
| `.tile--top .track-inner` | 4 images |
| `.tile--bottom .track-inner` | 4 images |

The mosaic grid is **single and static** — not duplicated per slide.

## CSS layout

**Shell** — `.carousel` is a 2-column grid at full viewport height.

**Text panel** — `overflow: hidden` clips the track. A white `::after` curtain on the right edge hides gallery bleed at the seam.

**Mosaic** — CSS Grid with:

- `--mosaic-col-left: 30%` for the overlap column width
- `grid-template-rows: 1fr 1fr` — top and bottom images meet at center
- `.tile--overlap` — column 1, row 1, `height: 50%`, `align-self: end` (half of top tile, bottom on seam)
- `.tile--top` — column 2, row 1, full height
- `.tile--bottom` — spans both columns, row 2

**Tile tracks** — each `.tile` is `overflow: hidden`. Inside, `.track-inner` is a horizontal flex row; each `img` is `flex: 0 0 100%` (one image visible at a time).

**Animation** — `transition: transform 0.85s ease` on all `.track-inner` elements.

## JavaScript

```js
tracks = [textTrack, overlapTrack, topTrack, bottomTrack]
```

On slide change:

1. `goTo(index)` guards against double-clicks during animation
2. `moveTo(index)` applies `translate3d(-index * 100%, 0, 0)` to **all 4 tracks**
3. Buttons disabled for 850ms, then re-enabled
4. Index wraps with modulo (infinite loop)
5. Autoplay every 6s; manual nav resets the timer
6. Arrow keys ← → also work

`index * 100%` works because each child in a track is exactly one frame wide (`flex: 0 0 100%`).

## Slide image mapping

Each tile has its own image order per slide:

| Slide | Overlap | Top | Bottom |
|-------|---------|-----|--------|
| 1 | stf | mmg | tp2 |
| 2 | mmg | tp2 | gbcc |
| 3 | tp2 | gbcc | stf |
| 4 | gbcc | stf | mmg |

Images rotate across tiles so every box always shows something different.

## Files

| File | Role |
|------|------|
| `works_v3.html` | Structure — 4 text slides + 3 image strips |
| `css/works_v3_styles.css` | Layout, grid, transitions, responsive |
| `js/works_v3.js` | Synced track movement, nav, autoplay, keyboard |

## Local preview

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000/works_v3.html](http://localhost:8000/works_v3.html).
