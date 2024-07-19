// IMPORT GLOBALS
const Buffer = require('node:buffer');

// IMPORT USEFUL MIDDLEWARES
const asyncHandler = require('express-async-handler');
const multer = require('multer'); // HANDLE MULTIPART FORM (FORM WITH FILE)

// IMPORT MODELS YOU NEED DB INTERACTION
const Category = require('../models/category.model');
const Item = require('../models/item.model');

// IMPORT HELPERS
const { handleUpload } = require('../helpers/cloudinary.helper');

exports.create_post = asyncHandler(async (req, res, next) => {
  const { selected } = req.params;
  // CRAETE VIRTUAL MEMORY FOR FILES TO BE UPLOADED
  console.log(selected);

  //   if (selected !== 'Category' || selected !== 'Item')
  //     return;

  const upload = multer({ storage: multer.memoryStorage() });

  // FIND 'image' FIELD IN REQUEST FILE & HANDLE UPLOAD
  upload.single('image')(req, res, async (err) => {
    if (err) {
      // HANDLE FILE UPLOAD ERRORS
      console.error(err);
      return res.status(400).json({ message: 'Error uploading file' });
    }

    // CONSOLE LOG REQ.FILE & REQ.BODY HERE
    console.log('req.file : ', req.file);
    console.log('req.body : ', req.body);

    const b64 = Buffer.Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const cldRes = await handleUpload(dataURI);
    console.log(cldRes);
    res.json(cldRes);
  });
});
