const express = require('express');
const router = express.Router();
const pool = require('../db');

// 🔁 Get all loans
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT l.id, b.title, m.first_name, m.last_name, l.loan_date, l.returned_date
      FROM loan l
      JOIN book b ON l.book_id = b.id
      JOIN member m ON l.member_id = m.id
      ORDER BY l.loan_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching loans:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// 📚 Issue a new loan
router.post('/', async (req, res) => {
  const { book_id, member_id } = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO loan (book_id, member_id)
      VALUES ($1, $2)
      RETURNING *
    `, [book_id, member_id]);

    res.status(201).json({ message: 'Book issued', loan: result.rows[0] });
  } catch (err) {
    console.error('Error issuing loan:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ↩️ Mark a loan as returned
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      UPDATE loan
      SET returned_date = CURRENT_DATE
      WHERE id = $1
      RETURNING *
    `, [id]);

    res.json({ message: 'Book returned', loan: result.rows[0] });
  } catch (err) {
    console.error('Error returning book:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
