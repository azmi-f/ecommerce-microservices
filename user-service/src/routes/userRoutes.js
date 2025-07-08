const express = require('express');
const router = express.Router();
const pool = require('../db'); // pastikan file src/db.js sudah ada dan benar

// Endpoint: POST /users/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Cek apakah email sudah digunakan
    const checkUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (checkUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email sudah terdaftar' });
    }

    // Email belum ada, lakukan insert
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, password]
    );

    res.json({
      message: 'User berhasil didaftarkan',
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mendaftarkan user' });
  }
});


// (Opsional) GET /users/ untuk tes koneksi
router.get('/', (req, res) => {
  res.json({ message: 'User Service is running 🎉' });
});

module.exports = router;
