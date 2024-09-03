const multer = require('multer');

const upload = multer();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../public/temp');
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + '-' + uniqueSuffix);
    cb(null, file.originalname); // the name of the file to save in local storage will be as same as the original name of the user.
  },
});

module.exports = {
  storage,
};
