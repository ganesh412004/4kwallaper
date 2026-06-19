// Usage: node add-post.js "Title" "content.html" --excerpt "..." --publish
const Database = require('better-sqlite3');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'blog.db');
const db = new Database(DB_PATH);

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: node add-post.js \"Title\" path/to/content.html [--excerpt \"...\"] [--publish]");
  process.exit(1);
}
const title = args[0];
const contentPath = args[1];
const content = fs.readFileSync(contentPath, 'utf8');
const excerptIndex = args.indexOf('--excerpt');
const excerpt = excerptIndex >= 0 ? args[excerptIndex + 1] : (content.substring(0, 200));
const publish = args.includes('--publish') ? 1 : 0;
const slug = slugify(title, { lower: true, strict: true });
const now = new Date().toISOString();

const stmt = db.prepare(`INSERT OR REPLACE INTO posts
  (title, slug, content, excerpt, created_at, updated_at, published)
  VALUES (?, ?, ?, ?, ?, ?, ?)`);
stmt.run(title, slug, content, excerpt, now, now, publish);
console.log('Added post', slug);
