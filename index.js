const express = require("express");
const cors = require("cors");
const pool = require("./db"); // PostgreSQL connection pool

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// Root route
app.get("/", (req, res) => {
  res.send("📚 Library backend is running!");
});

// Sample API route (can replace with full books route later)
app.get("/api/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching books:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DB connection test
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to PostgreSQL at:", res.rows[0].now);
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
