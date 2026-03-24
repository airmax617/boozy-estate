# Boozy Estate Audit Report

## Section 1: Code issues found and fixed

- Verified all required source files were read: `index.html`, `history.html`, `valuing.html`, `collection.html`, `decanters.html`, `contact.html`, `nav.js`, and `style.css`.
- Verified every page includes `nav.js` and a mobile viewport meta tag.
- Verified all local brand image references used by `history.html` resolve to existing files under `images/brands/`.
- Verified local internal page links resolve correctly after the fixes below.
- Fixed incomplete shared navigation:
  - Added missing `Decanter Database` and `Contact` links to [`collection.html`](./collection.html).
  - Added missing `Contact` link to [`decanters.html`](./decanters.html).
- Fixed inconsistent footer navigation:
  - Added `Database` and `Contact` links to the footer on all pages so page-to-page navigation is consistent site-wide.
- Fixed mobile nav state handling in [`nav.js`](./nav.js):
  - Closing the mobile menu via link click now also resets `aria-expanded="false"` instead of leaving stale state behind.
  - Hamburger toggle now writes explicit string values for `aria-expanded`.
- Fixed outdated domain references:
  - Updated all canonical URLs and `og:url` values from `airmax617.github.io/boozy-estate` to `boozyestate.com`.
  - Updated `robots.txt` sitemap URL to `https://boozyestate.com/sitemap.xml`.
  - Updated all URLs in [`sitemap.xml`](./sitemap.xml) to `https://boozyestate.com/...` and set the home page to `https://boozyestate.com/`.
- Fixed verified count mismatches:
  - [`decanters.html`](./decanters.html) metadata now says `2,289` decanters instead of `2,297`.
  - [`contact.html`](./contact.html) now links to `Search 2,289 entries` instead of `2,248`.
  - [`index.html`](./index.html) organization schema now says the database contains `2,289` bottles instead of `over 2,297`.
- Fixed incorrect hard-coded category count on [`decanters.html`](./decanters.html):
  - The stat strip previously displayed `12` categories.
  - It now calculates from the actual dataset at runtime and correctly displays `22`.

## Section 2: Code issues found but NOT fixed (needs human decision)

- External service dependency not live-tested:
  - [`contact.html`](./contact.html) posts to `https://formsubmit.co/ajax/boozyestate@gmail.com`.
  - I could verify the code path, but not the live endpoint behavior from this restricted environment.
- External asset dependency not live-tested:
  - [`style.css`](./style.css) imports Google Fonts.
  - [`collection.html`](./collection.html) and [`decanters.html`](./decanters.html) depend on external Baxus/CloudFront image and asset URLs from `manifest.json`.
  - The code handles image failures gracefully, but production availability/CORS/performance still need a live browser check.
- No end-to-end browser rendering run:
  - I validated structure, paths, and script logic statically and by data inspection.
  - A final manual browser pass on real mobile widths is still recommended before publishing.

## Section 3: Content accuracy flags (things to verify or update)

- Site positioning is inconsistent:
  - The brief describes Boozy Estate as a rare/collectible spirits business and consultancy.
  - Much of the site copy, especially [`index.html`](./index.html), [`history.html`](./history.html), and [`valuing.html`](./valuing.html), positions the brand much more narrowly as an American whiskey decanter guide.
  - Meanwhile, `manifest.json` contains a broader 319-bottle collection including Scotch, vodka, tequila, cognac, and other spirits.
- Collection framing is narrower than the actual manifest:
  - [`collection.html`](./collection.html) describes the showcase as vintage American whiskey / rare decanters.
  - The underlying manifest includes non-American and non-whiskey bottles, so this page may understate the actual scope of Max's collection.
- Baxus wallet claim from the brief is not represented in the checked-in data:
  - Requested wallet: `9nKDCxKY7jUyrueFCMsBk2fiSk2hSt37DFBR4bn8n6Te`
  - That wallet string does not appear anywhere in `manifest.json`, and the manifest currently exposes no owner wallet field to verify against.
- The brief says the collection includes `86` car-themed bottles and that this is the most valuable sub-collection.
  - I could verify `319` total manifest items and `136` Jim Beam-branded items from `manifest.json`.
  - I could not verify the exact `86` car-themed count or the "most valuable" claim directly from the checked-in data without a more authoritative tagging/value source.
- Historical claims that should be reviewed by a subject-matter expert before treating as authoritative:
  - George Thorpe as the first corn distillate in Virginia around 1620.
  - Evan Williams as beginning in Louisville around 1783.
  - Elijah Craig and early bourbon-origin implications.
  - Alfred Eaton / early Lincoln County charcoal-filtered whiskey claim.
  - Several "first" and "pivot point" statements in [`history.html`](./history.html) are presented confidently but are historically debated.
- Valuation claims that should be sourced or softened:
  - Specific example pricing bands on [`valuing.html`](./valuing.html), such as `$80 on Baxus`, `$35-45 at estate sale`, `$110-140 at reseller`.
  - Claims like "original box adds 30-60%" and "asking vs sold gap is often 50% or more."
  - These may be directionally true, but they read as factual benchmarks without cited comps.
- The decanter database value language needs contextual caution:
  - [`decanters.html`](./decanters.html) correctly cites Tom Dunn's 2016 guide.
  - Even so, the page should be reviewed to ensure users do not mistake 2016 guide values for current market prices.
- No placeholder text issues found:
  - I did not find `Lorem ipsum`, `TODO`, `[INSERT]`, `FIXME`, or similar placeholder copy in the audited HTML/CSS/JS files.

## Section 4: Overall assessment and recommendations

The site is structurally solid. Local page routing works, the shared navigation script is present on every page, the responsive viewport tag exists everywhere, and the local image references used by the history timeline are intact. The main code-quality problems were consistency issues: incomplete nav/footer coverage, stale SEO domain metadata, and mismatched public counts. Those are now fixed.

The bigger risk is content trust, not front-end breakage. The collection data, business positioning, and some of the most specific market/history claims are not fully aligned. Before launch, I recommend:

- Decide whether Boozy Estate is primarily a decanter-history niche site or a broader collectible spirits advisory brand, then align the homepage and collection copy to that decision.
- Verify the Baxus wallet/address and any numeric collection claims that are meant to be public-facing.
- Review history and valuation pages for claims that need sourcing, softer wording, or explicit dating.
- Do one live browser QA pass on desktop and mobile with network enabled, specifically checking FormSubmit, external fonts, Baxus links, and remote bottle images.
