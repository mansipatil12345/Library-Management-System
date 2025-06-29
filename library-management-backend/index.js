const express = require("express");
const cors = require("cors");
const pool = require("./config/db"); // PostgreSQL connection pool

const app = express();

app.use(cors());
app.use(express.json());

const loanRoutes = require("./src/routes/loan");
app.use("/api/loan", loanRoutes);

app.get("/", (req, res) => {
  res.send("📚 Library backend is running!");
});

app.get("/api/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM book");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching books:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/books", async (req, res) => {
  const { title, category_id, publication_date, copies_owned } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO book (title, category_id, publication_date, copies_owned)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, category_id, publication_date, copies_owned]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error inserting book:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to PostgreSQL at:", res.rows[0].now);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
