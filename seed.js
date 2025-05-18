const bcrypt = require('bcrypt');
const db = require('./db/connection');

async function seedUser() {
  const hash = await bcrypt.hash('password123', 10);
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', ['admin', hash], (err) => {
    if (err) {
      console.error('Gagal menambahkan user:', err.message);
    } else {
      console.log('User admin berhasil ditambahkan');
    }
    process.exit(); 
  });
}

seedUser();
