const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST /api/issued → Issue a book
router.post("/", async (req, res) => {
  const { student_id, book_id, return_date } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO issued_books (student_id, book_id, issue_date, return_date) VALUES ($1, $2, CURRENT_DATE, $3) RETURNING *",
      [student_id, book_id, return_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error issuing book:", err.message);
    res.status(500).json({ error: "Failed to issue book" });
  }
});

module.exports = router;
