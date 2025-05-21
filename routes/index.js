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

module.exports = router;
