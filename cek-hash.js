const bcrypt = require('bcrypt');

const passwordPlain = 'admin123'; // GANTI dengan password asli yang ingin dicek
const hash = '$2b$10$K4DltPHHzqPutkSvPnYeCOsuMod6kF8Gf0yYiU5/Chevckfagmg3K';

bcrypt.compare(passwordPlain, hash, (err, result) => {
  if (err) throw err;
  console.log('Apakah password cocok?', result);
});
