CREATE TABLE IF NOT EXISTS content (
 collection TEXT NOT NULL, id TEXT NOT NULL, payload TEXT NOT NULL,
 PRIMARY KEY(collection,id)
);
CREATE TABLE IF NOT EXISTS submissions (
 id TEXT PRIMARY KEY,
 kind TEXT NOT NULL CHECK(kind IN ('quotes','partnerships','contracts')),
 tracking_code TEXT NOT NULL UNIQUE,
 payload TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','reviewing','closed')),
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS submissions_kind_date ON submissions(kind,created_at);
CREATE TABLE IF NOT EXISTS request_limits (client TEXT PRIMARY KEY, count INTEGER NOT NULL, reset_at INTEGER NOT NULL);
