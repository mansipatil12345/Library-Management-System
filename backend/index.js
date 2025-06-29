const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database pool
const pool = require('./db');

// Import routes
const booksRoute = require('./routes/books');
const loansRoute = require('./routes/loans');
// Later: const membersRoute = require('./routes/members');
// Later: const finesRoute = require('./routes/fines');

// Use routes
app.use('/api/books', booksRoute);
app.use('/api/loans', loansRoute);
// app.use('/api/members', membersRoute); // uncomment when created
// app.use('/api/fines', finesRoute);     // uncomment when created

// Root route
app.get('/', (req, res) => {
  res.send('📚 Library Management API is running!');
});

// Test DB connection on startup
pool.query('SELECT NOW()', (err, resDb) => {
  if (err) {
    console.error('❌ PostgreSQL connection failed:', err.message);
  } else {
    console.log(`✅ Connected to PostgreSQL at: ${resDb.rows[0].now}`);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
