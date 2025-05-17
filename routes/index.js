const express = require('express');
const router = express.Router();
const db = require('../db');

// Halaman utama
router.get('/', (req, res) => {
  res.render('home');
});

// Halaman hewan
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

// Halaman buah
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

// Halaman kendaraan
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

module.exports = router;
