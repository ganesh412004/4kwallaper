# 4kWallpaper (Jekyll) - GitHub Pages ready

This repository now contains a Jekyll static blog site configured for GitHub Pages.

What I committed
- _config.yml (site settings)
- index.md (home listing posts)
- about.md
- _layouts/default.html and _layouts/post.html
- assets/css/styles.css
- assets/js/search.js (client-side search using Fuse.js)
- search.json (generated index for client-side search)
- _posts/ sample post
- assets/images/README.md (place your logo at assets/images/logo.png)

How to publish on GitHub Pages (make the site live)
1. Go to your repository on GitHub: https://github.com/ganesh412004/4kwallaper
2. Settings → Pages (or in the repository sidebar: Settings → Pages)
3. Under 'Build and deployment', choose 'Branch: main' and directory '/ (root)'
4. Save. GitHub will build the site and publish it at: https://ganesh412004.github.io/4kwallaper/

How to add a new post (no local build required)
- Method A: GitHub web UI (recommended)
  1. On GitHub, click Add file → Create new file
  2. Name the file: `_posts/YYYY-MM-DD-your-title.md` (example: `_posts/2026-06-20-my-seo-post.md`)
  3. Add front matter at the top (example):
     ```yaml
     ---
     layout: post
     title: "My SEO Friendly Title"
     excerpt: "Short summary for listings"
     meta_description: "120-160 char meta description for search engines"
     date: 2026-06-20 12:00:00 +0000
     image: /assets/images/featured.jpg
     ---
     ```
  4. Add your Markdown content below the front matter. Commit the file.
  5. GitHub Pages rebuilds automatically and your post goes live.

- Method B: Create a PR / commit via git locally and push to main (advanced users)

Search and logo
- To add your logo, upload `logo.png` to `assets/images/logo.png`.
- Search uses `search.json` and Fuse.js; GitHub Pages generates `search.json` during build.

SEO features
- jekyll-seo-tag is enabled; it injects meta tags and OpenGraph tags based on front matter and site settings.
- sitemap is generated automatically by jekyll-sitemap. Submit it to Google Search Console.

Security & notes
- Everything is static. No server-side admin UI is included. To add posts in a browser, use GitHub web UI or use a Git-backed CMS (Netlify CMS) — I can configure Netlify CMS for you if you prefer a nicer admin panel.

If you want, I can now:
- (A) Upload your provided logo image into `assets/images/logo.png` if you confirm the filename.
- (B) Configure Netlify CMS so you get a friendly admin UI to add posts without touching GitHub files.

Tell me which next step you want me to do.