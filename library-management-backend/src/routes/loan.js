const express = require("express");
const router = express.Router();
const pool = require("../../config/db");

// ✅ GET all loans
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM loan");
    res.json(result.rows); // ✅ Fixed: Send rows back
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ✅ POST create loan
router.post("/", async (req, res) => {
  const { member_id, book_id, loan_date, return_date } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO loan (member_id, book_id, loan_date, returned_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [member_id, book_id, loan_date, return_date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
