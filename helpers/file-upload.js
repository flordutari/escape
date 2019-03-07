'use strict';

const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'drkujr1xv',
  api_key: 738341528787581,
  api_secret: 'Aa_ln9BerYfqOwIYV93xcl0MxE4'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'project_2_images',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      req.fileValidationError = true;
      return cb(null, false, new Error('Wrong file type uploaded'));
    }
    cb(null, true);
  }
});

module.exports = parser
;
