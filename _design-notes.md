# Boozy Estate: design direction (next redesign)

This is the look Max wants for boozyestate.com. It is a brief for the next pass, not a description of
the current site. The current system (`site.css`, Playfair + Inter, amber on near-black, pill buttons,
rounded tiles) stays live until this is built.

Reference point: oakleyspirits.com, and the private reference build on the Mac mini that already uses
this system. The lesson from that build: the first two passes "looked like a template". Rounded cards,
pill buttons, soft gradients and evenly spaced tiles are what make a site read as a template. The
fix was to commit: hard edges, full-bleed color grounds, oversized type, numbered things.

## 1. Color: two grounds, one type color

Sections alternate between whole grounds of color, not a dark page with colored accents.

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0e0a04` (keep current `--bg`) | Main ground |
| `--ink-2` | `#161007` | Alternate dark ground |
| `--amber` | `#d08a1e` | **Second full ground** + accent |
| `--amber-deep` | `#a86a12` | Hover/pressed on amber |
| `--cream` | `#f5edd6` | All type on ink; also a third ground (light sections) |
| `--muted` | `#9c8a68` | Secondary text on ink |

- On an amber ground, type is **ink, not cream** (cream on this amber is about 2.3:1 and fails
  contrast). On ink and cream grounds, amber is the accent.
- Rough rhythm per page: ink → ink-2 → amber → ink → cream. Never two amber sections in a row.
- Delete the soft `--amber-soft` tints and gradient washes. Color is either a full ground or a line.

## 2. Type: three faces, three jobs

| Role | Face | Treatment |
|---|---|---|
| Display (h1, h2, quotes, counters) | **Bodoni Moda** (high-contrast didone, optical sizes) | ALL CAPS, weight 400, line-height .95, huge: h1 `clamp(3rem, 9vw, 8.5rem)` |
| Labels, nav, buttons, h3, metadata | **Barlow Condensed** 500/600/700 | ALL CAPS, letter-spacing .08–.12em |
| Reading | **Work Sans** | 1.0625rem / 1.65, max ~62ch |

- Italic Bodoni (not caps) for years and asides: *1955–1992*, *Regal China era*.
- Playfair goes. Inter goes. (Bodoni and Barlow are on Google Fonts, so the no-build static site
  keeps working.)

## 3. Shapes and controls

- **Square everything.** `border-radius: 0` on buttons, cards, inputs, images.
- Buttons: condensed caps, 1.5px border, a `»` chevron after the label, min-height 46px.
  Solid amber for the primary action, outline for the rest. Hover inverts to cream.
- Text links in condensed caps get a trailing ` »`.
- Chips (filters): square, 1px line border, the selected one filled amber.
- Dividers are 1px hairlines (`rgba(cream, .22)`), used generously: lists of rows, not grids of boxes.

## 4. Photos

- **Decanters and bottles always stay in color.** Color is how a decanter is identified (the two blue
  '59 Cadillacs, the Corvette colors), so never desaturate them.
- **Archival and history images** (old ads, distillery photos, brand logos on history.html) run
  black-and-white and get their color back on hover. That makes a dozen sources look like one shoot.
- Bottles go on stages: the warm studio-style cutouts already on collection.html are the right idea.
  Make them big, one bottle per card, nothing else competing.
- Credits sit under every image that isn't ours, always visible, in small condensed caps.

## 5. Signature pieces

**Numbered collector cards.** Every decanter in the vault, the For Sale list and the database result
cards gets a number in Bodoni: `No. 0142`. Layout: big photo on a stage, number top-left, name in
condensed caps, year in italic Bodoni, value/mintage as a hairline-separated spec row. Group cards
under era headings (e.g. *Regal China, 1955–1992*), with a giant section number.

**Numbered chapters.** history.html and louis-xiii.html become chapters: a sticky left column with
`01 / 09` (counter in Bodoni, total dimmed), the years in big italic, the place or era name as a label;
the right column holds the story. Each chapter ends in a full-width photo strip (1–3 images) and a
`Sources:` line in condensed caps. Louis XIII's nine eras map onto this directly.

**Big quotes.** Pull quotes in Bodoni caps at ~4rem with a condensed-caps citation. Use them where
we have real sourced quotes (guide authors, collectors, press), never invented ones.

**Row lists, not tile grids.** Press, sources, the series index and "More from this series" render as
full-width hairline rows: `PUBLICATION | TITLE | YEAR | »`, with an amber tint and a small indent
on hover.

## 6. Layout

- Header: nav left, logo centered, primary CTA right (e.g. `Search the database »`). On the home
  page it floats over a full-bleed hero, and the centered logo hides there because the hero carries it.
  On phones: logo + CTA on row one, nav on row two.
- Hero: full-viewport photo, slow zoom (scale 1 → 1.06 over ~20s), oversized caps headline
  bottom-left.
- Wrap 1320px; gutter `clamp(16px, 3.5vw, 40px)`; section padding `clamp(64px, 10vw, 140px)`.
- Two-column splits are unequal (11/9, 4/8), never 50/50.
- Footer: four columns (brand + tagline in italic, Pages, Find the database, Follow), then a fine
  print row in muted condensed caps.

## 7. Texture and motion

- Film grain over the whole page: a fixed SVG `feTurbulence` noise layer at ~7% opacity,
  `pointer-events: none`. It stops the flat color grounds from feeling digital.
- Scroll reveal on headings, quotes, cards and photos (fade + 26px rise, .9s). Content is visible
  by default, and JS opts elements in, so nothing is hidden if JS fails.
- Black-and-white photos fade back to color over .6s on hover.
- Everything off under `prefers-reduced-motion`.

## 8. Page by page

| Page | Direction |
|---|---|
| Home | Full-bleed decanter hero, caps headline. Then: amber ground with the database search as one huge input. Then the three pillars as numbered rows (01 History, 02 Valuing, 03 Collection), not cards. Then a strip of numbered collector cards from the vault. |
| decanters.html | Keep all the function (search, brand/category filters, sort, In Vault, Show more). Filters become square chips; results become hairline rows on desktop and collector cards on phones. Category headers in Bodoni caps. |
| Bottle pages (`decanters/*`) | One collector card at large size: photo on a stage, `No.`, spec rows, "More from this series" as a row list. Regenerate with `generate_decanter_pages.py`. |
| collection.html | Collector cards grouped by era, on ink with an amber section break. |
| history.html | Numbered chapters with B&W archival strips and Sources lines. |
| valuing.html | The three markets as giant numbered rows on cream; the six value factors as a `01 / 06` counter list. |
| louis-xiii.html | Nine numbered era chapters; keep the thumbnail-swap strip, square it off. |
| for-sale.html | Collector cards, each with its guide value and a square amber `Ask about this »` button. |
| contact.html | One cream section, square inputs, the existing FormSubmit form untouched. |

## 9. Rules that carry over

- **Don't invent facts.** Every value, mintage, date and quote traces to the Tom Dunn guide, Baxus, or
  a named source. Design never adds filler copy.
- Keep the SEO heads, anchor ids, sitemap, `llms.txt`, and the FormSubmit form exactly as they are.
- Phone width is checked on every page: 16px gutter, no horizontal scroll, 44px tap targets.
- Still needed: a **vector Boozy Estate mark** for the centered logo. There is no logo file in the
  repo today.
