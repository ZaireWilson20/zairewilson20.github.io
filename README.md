# zairewilson20.github.io

Personal site and portfolio for Zaire Wilson, built with [Astro](https://astro.build) and deployed to GitHub Pages by GitHub Actions.

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve dist/ locally
```

## Where things live

| What | Where |
| --- | --- |
| Site settings, profile, social links | `src/data/site.yml` |
| Workshop cards (Currently Building) | `src/data/now.yml` |
| Hallway frames + project modals (Selected Work) | `src/data/projects.yml` |
| Gallery tiles (Art & Screens) | `src/data/gallery.yml` |
| Study (Experience, education, certs) | `src/data/experience.yml` |
| Blog posts | `src/content/blog/YYYY-MM-DD-slug.md` (URL: `/YYYY/MM/DD/slug.html`) |
| Pages | `src/pages/` |
| Layouts / components | `src/layouts/`, `src/components/` |
| Which style each component uses (variants a/b/c, motion on/off) | `src/data/design.yml` |
| Design tokens (colors, fonts, motion) | `src/styles/global.css` |
| House components (one per Claude Design component) | `src/components/house/` |
| Client behavior (light switch, modals, room slide-in) | `src/scripts/house.ts` |
| Original Claude Design export | `design/Zaire House Concept.html` |
| Images, PDFs, static JS/CSS | `public/` (served from `/`) |

Project modals can embed YouTube videos per section:

```yaml
contents:
  - title: Puzzle Demos
    videos:
      - title: Medusa Puzzle
        youtube: klkgI2-2Scg
```

## Trying design variants

Every house component has the a/b/c variants from the Claude Design export. Pick them in
`src/data/design.yml`; with `npm run dev` running, saving the file updates the page.

To compare every variant side by side with real content, open http://localhost:4321/sheet
while the dev server is running. That component sheet is dev-only and never deployed.

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/`.
Repo **Settings → Pages → Source** must be set to **GitHub Actions**.

Visual design ("The House") made with Claude Design. The site was originally based on the [Grape Theme](https://github.com/naye0ng/Grape-Theme) by Nayeong Kim (MIT, see `LICENSE.txt`).
