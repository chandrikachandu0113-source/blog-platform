const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

async function connectDB() {
  const db = await open({
    filename: "./blog.db",
    driver: sqlite3.Database,
  });


  // Posts table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);


  // Users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);


  console.log("Database connected successfully ✅");

  return db;
}

module.exports = connectDB;