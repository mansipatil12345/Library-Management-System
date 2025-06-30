const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all fines
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT f.id, m.first_name, m.last_name, f.fine_date, f.fine_amount
      FROM fine f
      JOIN member m ON f.member_id = m.id
      ORDER BY f.fine_date DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching fines:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new fine
router.post('/', async (req, res) => {
  const { member_id, loan_id, fine_amount } = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO fine (member_id, loan_id, fine_amount)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [member_id, loan_id || null, fine_amount]);

    res.status(201).json({ message: 'Fine added', fine: result.rows[0] });
  } catch (err) {
    console.error('Error adding fine:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
