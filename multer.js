const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, './upload/');
    } else {
      cb(new Error('Invalid file type'), null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadimage = multer({
  storage: storage,
});

module.exports = uploadimage;
