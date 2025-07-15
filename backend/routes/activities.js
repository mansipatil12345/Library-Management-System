const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const activities = await pool.query(`
      SELECT id, user_name, action, timestamp 
      FROM activity_logs 
      ORDER BY timestamp DESC 
      LIMIT 10
    `);
    res.json(activities.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error fetching activities' });
  }
});
module.exports = router;
