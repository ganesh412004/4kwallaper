# 4kWallpaper Blog

This is a small Express + SQLite blog.

## Setup (local)
1. Install dependencies:
   npm install

2. Initialize DB:
   npm run init-db

3. Start:
   npm start

Open http://localhost:3000

## Add posts
- Admin form: open http://localhost:3000/admin and fill the form (no auth in this basic sample — add authentication for production).
- CLI: node add-post.js "My Title" path/to/content.html --excerpt "Short excerpt" --publish

## Deploy
- Deploy to any Node hosting (Render, Heroku, Fly, Vercel (serverful), Railway).
- Set SITE_URL env var to your public site URL to get correct canonical/og links.

## SEO checklist for each post
1. Title: unique, includes primary keyword, 50–60 characters ideal.
2. Slug: short and readable (the app creates from title).
3. Meta description: 120–160 characters summarizing the page.
4. H1: use the post title as H1 (done).
5. Use headings (H2/H3) to structure content.
6. Images: use descriptive filenames and alt text.
7. Internal links: link to related posts and main pages.
8. Schema/JSON-LD: use Article schema for posts (you can add it to the head for each post).
9. Sitemap and robots.txt: /sitemap.xml is provided.
10. Fast load times: optimize images, enable compression on the server in production, serve via CDN.

## Notes
- This sample stores content as HTML. Consider using Markdown with an editor and rendering to HTML for convenience.
- For production, add authentication for the /admin route and protect database files.
