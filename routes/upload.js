const multer = require('multer');
const path = require('path');

// Simpan gambar ke folder: public/stylesheets/image/kartunhewan.image/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/stylesheets/image/kartunhewan.image');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // .png
    const name = 'kartunhewan' + Date.now() + ext;
    cb(null, name);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
  const { objek, kategori_id } = req.body;
  const image = req.file.filename;

  const sql = `INSERT INTO objek (objek, kategori_id, image) VALUES (?, ?, ?)`;
  db.query(sql, [objek, kategori_id, image], (err, result) => {
    if (err) throw err;
    res.send('Upload berhasil ke kartunhewan.image!');
  });
});

