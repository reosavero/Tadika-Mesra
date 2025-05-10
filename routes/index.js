const express = require('express');
const router = express.Router();
const db = require('../db');

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
    res.render('kategori', { title: 'Hewan', objek: results });
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
    res.render('kategori', { title: 'Buah', objek: results });
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
    res.render('kategori', { title: 'Kendaraan', objek: results });
  });
});
module.exports = router;
