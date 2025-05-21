const express = require('express');
const router = express.Router();

// Data dummy kendaraan
const kendaraanList = [
  {
    nama_objek: 'mobil',
    gambar: 'mobil.jpg',
    audio: 'mobil.mp3'
  },
  {
    nama_objek: 'motor',
    gambar: 'motor.jpg',
    audio: 'motor.mp3'
  },
  {
    nama_objek: null, // contoh data yang bisa menyebabkan error
    gambar: 'truk.jpg',
    audio: 'truk.mp3'
  }
];

// Tampilkan halaman kendaraan
router.get('/', (req, res) => {
  res.render('kendaraan', { data: kendaraanList });
});

module.exports = router;
