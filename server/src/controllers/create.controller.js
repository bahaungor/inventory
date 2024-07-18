// IMPORT USEFUL MIDDLEWARES
const asyncHandler = require('express-async-handler');
const multer = require('multer');

// IMPORT MODELS YOU NEED DB INTERACTION
const Category = require('../models/category.model');
const Item = require('../models/item.model');

exports.create_post = asyncHandler(async (req, res, next) => {
  const { selected } = req.params;
  // CRAETE VIRTUAL MEMORY FOR FILES TO BE UPLOADED
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

    // const setting = await Setting.findByIdAndUpdate(req.body.id, {
    //   $set: {
    //     'specSwitch.$[elem].refPicture': await sharp(req.file.buffer).resize({ width: 300 }).jpeg({ quality: 50, force: true }).toBuffer(),
    //   },
    // }, { new: true, arrayFilters: [{ 'elem.spec': req.body.spec }] });
    // res.json({ setting });
  });
});
