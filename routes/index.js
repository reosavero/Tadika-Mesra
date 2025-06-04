const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'gambar') {
      cb(null, 'public/uploads/images');
    } else if (file.fieldname === 'audio') {
      cb(null, 'public/uploads/audio');
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


router.get('/', (req, res) => {
  res.render('home');
});

router.get('/hewan', (req, res) => {
  const sql = `
    SELECT objek.*, kategori.nama AS kategori
    FROM objek
    LEFT JOIN kategori ON objek.kategori_id = kategori.id
    WHERE objek.kategori_id = 2
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('hewan', { data: results });
  });
});

router.get('/buah', (req, res) => {
  const sql = `
    SELECT objek.*, kategori.nama AS kategori
    FROM objek
    LEFT JOIN kategori ON objek.kategori_id = kategori.id
    WHERE objek.kategori_id = 3
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('buah', { data: results });
  });
});

router.get('/kendaraan', (req, res) => {
  const sql = `
    SELECT objek.*, kategori.nama AS kategori
    FROM objek
    LEFT JOIN kategori ON objek.kategori_id = kategori.id
    WHERE objek.kategori_id = 4
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('kendaraan', { data: results });
  });
});

router.get('/create', (req, res) => {
  const sql = 'SELECT * FROM kategori';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('create', { kategori: results });
  });
});

router.post('/create', upload.fields([
  { name: 'gambar', maxCount: 1 },
  { name: 'audio', maxCount: 1 }
]), (req, res) => {
  const { nama_objek, kategori_id } = req.body;
  const gambar = req.files.gambar ? req.files.gambar[0].filename : null;
  const audio = req.files.audio ? req.files.audio[0].filename : null;

  const sql = `
    INSERT INTO objek (nama_objek, kategori_id, gambar, audio)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [nama_objek, kategori_id, gambar, audio], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

router.get('/dashboard', (req, res) => {
  const admin = req.session.admin;

  if (!admin) {
    return res.redirect('/login');
  }

  const getKategori = `SELECT * FROM kategori`;
  const getObjek = `
    SELECT objek.*, kategori.nama AS kategori_nama
    FROM objek
    JOIN kategori ON objek.kategori_id = kategori.id
  `;

  db.query(getKategori, (err, kategori) => {
    if (err) throw err;

    db.query(getObjek, (err, objek) => {
      if (err) throw err;

      res.render('dashboard', {
        admin,
        kategori,
        objek
      });
    });
  });
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;

  const sqlObjek = 'SELECT * FROM objek WHERE id = ?';
  const sqlKategori = 'SELECT * FROM kategori';

  db.query(sqlObjek, [id], (err, hasilObjek) => {
    if (err) {
      console.error(err);
      return res.send('Gagal mengambil data objek');
    }

    if (hasilObjek.length === 0) {
      return res.send('Data tidak ditemukan');
    }

    db.query(sqlKategori, (err2, hasilKategori) => {
      if (err2) {
        console.error(err2);
        return res.send('Gagal mengambil data kategori');
      }

      res.render('edit', {
        objek: hasilObjek[0],
        kategori: hasilKategori
      });
    });
  });
});


// Proses update
router.post('/edit/:id', upload.fields([
  { name: 'gambar', maxCount: 1 },
  { name: 'audio', maxCount: 1 }
]), (req, res) => {
  const id = req.params.id;
  const { nama_objek, kategori_id } = req.body;

  db.query('SELECT * FROM objek WHERE id = ?', [id], (err, results) => {
    if (err) return res.send('Gagal mengambil data lama');

    if (results.length === 0) return res.send('Data tidak ditemukan');

    const lama = results[0];
    const gambarBaru = req.files['gambar'] ? req.files['gambar'][0].filename : lama.gambar;
    const audioBaru = req.files['audio'] ? req.files['audio'][0].filename : lama.audio;

    const updateQuery = `
      UPDATE objek SET nama_objek = ?, kategori_id = ?, gambar = ?, audio = ? WHERE id = ?
    `;
    db.query(updateQuery, [nama_objek, kategori_id, gambarBaru, audioBaru, id], (err2) => {
      if (err2) return res.send('Gagal memperbarui data');
      res.redirect('/dashboard');
    });
  });
});

router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await db.promise().query('DELETE FROM objek WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      res.redirect('/dashboard'); // sukses dihapus
    } else {
      res.status(404).send('Data tidak ditemukan');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal menghapus data');
  }
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

module.exports = router;
