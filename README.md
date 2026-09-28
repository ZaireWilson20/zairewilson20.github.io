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
| Currently Building cards | `src/data/now.yml` |
| Experience timeline, education, certs | `src/data/experience.yml` |
| Selected Work cards + modals | `src/data/projects.yml` |
| Blog posts | `src/content/blog/YYYY-MM-DD-slug.md` (URL: `/YYYY/MM/DD/slug.html`) |
| Pages | `src/pages/` |
| Layouts / components | `src/layouts/`, `src/components/` |
| Styles (SCSS) | `src/styles/` |
| Images, PDFs, static JS/CSS | `public/` (served from `/`) |

Project modals can embed YouTube videos per section:

```yaml
contents:
  - title: Puzzle Demos
    videos:
      - title: Medusa Puzzle
        youtube: klkgI2-2Scg
```

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/`.
Repo **Settings → Pages → Source** must be set to **GitHub Actions**.

Styles originally based on the [Grape Theme](https://github.com/naye0ng/Grape-Theme) by Nayeong Kim (MIT, see `LICENSE.txt`).
