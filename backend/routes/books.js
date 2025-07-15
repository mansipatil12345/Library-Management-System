const express = require('express');
const router = express.Router();
const pool = require('../db');

// 🧾 GET all books with category and authors
router.get('/', async (req, res) => {
  try {
    const booksResult = await pool.query(`
      SELECT 
        b.id AS book_id,
        b.title,
        b.publication_date,
        b.copies_owned,
        c.category_name
      FROM book b
      JOIN category c ON b.category_id = c.id
      ORDER BY b.id
    `);

    const books = booksResult.rows;

    // Add authors to each book
    for (let book of books) {
      const authorsResult = await pool.query(`
        SELECT a.first_name, a.last_name
        FROM author a
        JOIN book_author ba ON a.id = ba.author_id
        WHERE ba.book_id = $1
      `, [book.book_id]);

      book.authors = authorsResult.rows.map(a => `${a.first_name} ${a.last_name}`);
    }

    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ➕ POST a new book and attach authors
router.post('/', async (req, res) => {
  const { title, category_id, publication_date, copies_owned, author_ids } = req.body;

  try {
    const bookResult = await pool.query(
      `INSERT INTO book (title, category_id, publication_date, copies_owned)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, category_id, publication_date, copies_owned]
    );

    const book = bookResult.rows[0];

    // Attach authors
    for (let author_id of author_ids) {
      await pool.query(
        `INSERT INTO book_author (book_id, author_id)
         VALUES ($1, $2)`,
        [book.id, author_id]
      );
    }

    res.status(201).json({ message: 'Book created', book });
  } catch (err) {
    console.error('Error adding book:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// 📚 GET a single book
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM book WHERE id = $1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching book:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✏️ UPDATE a book (and its authors)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, category_id, publication_date, copies_owned, author_ids } = req.body;

  try {
    // Update book details
    await pool.query(
      `UPDATE book SET title=$1, category_id=$2, publication_date=$3, copies_owned=$4
       WHERE id=$5`,
      [title, category_id, publication_date, copies_owned, id]
    );

    // Remove existing authors from book_author
    await pool.query(`DELETE FROM book_author WHERE book_id = $1`, [id]);

    // Re-insert new authors
    for (let author_id of author_ids) {
      await pool.query(
        `INSERT INTO book_author (book_id, author_id) VALUES ($1, $2)`,
        [id, author_id]
      );
    }

    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    console.error('Error updating book:', err.message);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// ❌ DELETE a book (and its authors from junction table)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM book_author WHERE book_id = $1`, [id]);
    await pool.query(`DELETE FROM book WHERE id = $1`, [id]);

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
