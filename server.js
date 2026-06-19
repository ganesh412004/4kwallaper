const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Database = require('better-sqlite3');
const slugify = require('slugify');

const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'blog.db');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Open DB
const db = new Database(DB_PATH);

// Helpers
function renderMeta(post) {
  return {
    title: post ? post.title : '4kWallpaper Blog',
    description: post ? (post.meta_description || post.excerpt || '') : '4kWallpaper blog',
    url: post ? (`${process.env.SITE_URL || 'http://localhost:3000'}/post/${post.slug}`) : (process.env.SITE_URL || 'http://localhost:3000')
  };
}

// Routes
app.get('/', (req, res) => {
  const stmt = db.prepare("SELECT id,title,slug,excerpt,created_at,featured_image FROM posts WHERE published=1 ORDER BY created_at DESC");
  const posts = stmt.all();
  res.render('index', { posts, meta: { title: 'Home - 4kWallpaper Blog', description: 'Latest posts' }});
});

app.get('/post/:slug', (req, res) => {
  const stmt = db.prepare("SELECT * FROM posts WHERE slug = ? AND published=1");
  const post = stmt.get(req.params.slug);
  if (!post) return res.status(404).send('Not found');
  res.render('post', { post, meta: renderMeta(post) });
});

app.get('/search', (req, res) => {
  const q = (req.query.q || '').trim();
  let posts = [];
  if (q) {
    const stmt = db.prepare("SELECT id,title,slug,excerpt,created_at FROM posts WHERE published=1 AND (title LIKE ? OR content LIKE ?) ORDER BY created_at DESC");
    const like = `%${q}%`;
    posts = stmt.all(like, like);
  }
  res.render('index', { posts, query: q, meta: { title: `Search: ${q}`, description: `Search results for ${q}` }});
});

// Simple admin page (no auth). For production, protect this route.
app.get('/admin', (req, res) => {
  res.render('admin', { meta: { title: 'Create post' }});
});

app.post('/admin', (req, res) => {
  const { title, content, excerpt, meta_description, featured_image, tags, publish } = req.body;
  const slug = slugify(title, { lower: true, strict: true });
  const now = new Date().toISOString();
  const published = publish === 'on' ? 1 : 0;
  const stmt = db.prepare(`INSERT OR REPLACE INTO posts
    (title, slug, content, excerpt, meta_description, featured_image, tags, created_at, updated_at, published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  stmt.run(title, slug, content, excerpt, meta_description, featured_image, tags, now, now, published);
  res.redirect(`/post/${slug}`);
});

// Sitemap
app.get('/sitemap.xml', (req, res) => {
  const stmt = db.prepare("SELECT slug, updated_at FROM posts WHERE published=1");
  const rows = stmt.all();
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  rows.forEach(r => {
    xml += '  <url>\n';
    xml += `    <loc>${siteUrl}/post/${r.slug}</loc>\n`;
    xml += `    <lastmod>${(r.updated_at || r.created_at || new Date()).split('T')[0]}</lastmod>\n`;
    xml += '  </url>\n';
  });
  xml += '</urlset>';
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
