const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
  destination: './public/uploads/images/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_img_' + path.extname(file.originalname));
  }
});

const audioStorage = multer.diskStorage({
  destination: './public/uploads/audio/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_audio_' + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, './public/uploads/images/');
      } else if (file.mimetype.startsWith('audio/')) {
        cb(null, './public/uploads/audio/');
      }
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  })
});


