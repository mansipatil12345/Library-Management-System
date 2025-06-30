const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all members
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT m.id, m.first_name, m.last_name, m.joined_date, ms.status_value AS status
      FROM member m
      JOIN member_status ms ON m.active_status_id = ms.id
      ORDER BY m.id;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching members:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new member
router.post('/', async (req, res) => {
  const { first_name, last_name, active_status_id } = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO member (first_name, last_name, active_status_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [first_name, last_name, active_status_id]);

    res.status(201).json({ message: 'Member added', member: result.rows[0] });
  } catch (err) {
    console.error('Error adding member:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
