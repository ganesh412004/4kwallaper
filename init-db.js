const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const DB_PATH = path.join(DATA_DIR, 'blog.db');
const db = new Database(DB_PATH);

// Create posts table
db.exec(`
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  meta_description TEXT,
  featured_image TEXT,
  tags TEXT,
  created_at TEXT,
  updated_at TEXT,
  published INTEGER DEFAULT 0
);
`);

// Insert sample post
const now = new Date().toISOString();
const stmt = db.prepare("INSERT OR IGNORE INTO posts (title, slug, content, excerpt, meta_description, created_at, updated_at, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
stmt.run(
  "Welcome to 4kWallpaper Blog",
  "welcome-to-4kwallaper-blog",
  "<p>This is the first post. Replace it with your own content.</p>",
  "This is the first sample post.",
  "Welcome to the 4kWallpaper blog — sample post.",
  now,
  now,
  1
);

console.log("Database initialized at", DB_PATH);
