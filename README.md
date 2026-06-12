# bod-business-card

Design-to-code practice for the [Bigs On Dev Business Card](https://bigsondev.com/projects/business-card-project/) project.

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Business card landing page |
| `works.html` | Original works slider (code background + wave) |
| `works_v2.html` | Earlier carousel experiment |
| `works_v3.html` | Current works carousel — Bread Byte–inspired split layout |

## works_v3 carousel

Split-screen portfolio carousel: text slides on the left, a fixed 3-tile image mosaic on the right. The mosaic boxes stay put; each tile slides its own image strip in sync with the text.

See **[works_v3_carousel.md](./works_v3_carousel.md)** for the full breakdown (HTML structure, CSS grid, JS tracks).

```bash
python3 -m http.server 8000
# → http://localhost:8000/works_v3.html
```

## Stack

Plain HTML, CSS, and JavaScript — no framework or build step.
