import Database from "better-sqlite3";
import path from "path";
import { randomUUID } from "crypto";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(dbPath);
    _db.pragma("journal_mode = WAL");
    initSchema(_db);
  }
  return _db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS Progress (
      id TEXT PRIMARY KEY,
      moduleId TEXT UNIQUE NOT NULL,
      status TEXT NOT NULL DEFAULT 'locked',
      score INTEGER,
      attempts INTEGER NOT NULL DEFAULT 0,
      completedAt TEXT,
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS TestResponse (
      id TEXT PRIMARY KEY,
      progressId TEXT NOT NULL,
      questionId TEXT NOT NULL,
      questionType TEXT NOT NULL,
      userResponse TEXT NOT NULL,
      feedback TEXT,
      score INTEGER,
      maxScore INTEGER NOT NULL,
      passed INTEGER,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (progressId) REFERENCES Progress(id)
    );
  `);
}

// Progress helpers
export function getAllProgress() {
  return getDb().prepare("SELECT * FROM Progress").all();
}

export function getProgressByModule(moduleId: string) {
  return getDb().prepare("SELECT * FROM Progress WHERE moduleId = ?").get(moduleId) as any;
}

export function upsertProgress(moduleId: string, status: string) {
  const db = getDb();
  const existing = getProgressByModule(moduleId);
  if (existing) return existing;
  const id = randomUUID();
  db.prepare(
    "INSERT INTO Progress (id, moduleId, status) VALUES (?, ?, ?)"
  ).run(id, moduleId, status);
  return getProgressByModule(moduleId);
}

export function updateProgress(moduleId: string, status: string, score: number) {
  const db = getDb();
  db.prepare(`
    UPDATE Progress
    SET status = ?, score = ?, attempts = attempts + 1,
        completedAt = CASE WHEN ? = 'completed' THEN datetime('now') ELSE completedAt END,
        updatedAt = datetime('now')
    WHERE moduleId = ?
  `).run(status, score, status, moduleId);
  return getProgressByModule(moduleId);
}

export function unlockModule(moduleId: string) {
  getDb().prepare(
    "UPDATE Progress SET status = 'available', updatedAt = datetime('now') WHERE moduleId = ? AND status = 'locked'"
  ).run(moduleId);
}

// TestResponse helpers
export function createTestResponse(params: {
  progressId: string;
  questionId: string;
  questionType: string;
  userResponse: string;
  feedback: string;
  score: number;
  maxScore: number;
  passed: boolean;
}) {
  const id = randomUUID();
  getDb().prepare(`
    INSERT INTO TestResponse (id, progressId, questionId, questionType, userResponse, feedback, score, maxScore, passed)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, params.progressId, params.questionId, params.questionType, params.userResponse, params.feedback, params.score, params.maxScore, params.passed ? 1 : 0);
  return id;
}
