// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://zairewilson20.github.io',
  // Emit /portfolio.html, /tags.html, /2024/08/27/post.html ... to match the old Jekyll URLs
  build: { format: 'file' },
  trailingSlash: 'never',
  // The portfolio used to live at /portfolio; it's the home page now
  redirects: { '/portfolio': '/' },
  markdown: {
    // Prism classes, styled by /assets/css/highlightTheme.css (same theme the project modals use)
    syntaxHighlight: 'prism',
  },
});
