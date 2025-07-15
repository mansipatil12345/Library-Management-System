const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const bookRoutes = require('./routes/books');
const loanRoutes = require('./routes/loans');
const memberRoutes = require('./routes/members');
const fineRoutes = require('./routes/fines'); // ✅ this is critical
const activitiesRoutes = require('./routes/activities');



// Route mounting
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/fines', fineRoutes); // ✅ mount fines here
app.use('/api/activities', activitiesRoutes);


// Sanity check
app.get('/', (req, res) => {
  res.send('📚 LMS Backend API is live!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log(`✅ Connected to PostgreSQL at: ${result.rows[0].now}`);
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
  }
});
