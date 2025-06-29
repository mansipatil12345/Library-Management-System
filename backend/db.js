// db.js
const { Pool } = require("pg");

// ✅ Using your hardcoded credentials
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lms_db",
  password: "2006",
  port: 5432,
});

module.exports = pool;
