// IMPORT USEFUL MIDDLEWARES
const asyncHandler = require('express-async-handler');
const multer = require('multer'); // HANDLE MULTIPART FORM
const sharp = require('sharp'); // OPTIMIZE IMAGES

// IMPORT HELPERS
const { handleUpload, handleDelete } = require('../helpers/cloudinary.helper');

// IMPORT MODELS YOU NEED DB INTERACTION
const Category = require('../models/category.model');
const Item = require('../models/item.model');

// DEFINE FUNCTION TO FETCH DATA & SEND INSIDE JSON WHEN CALLED
exports.category_get = asyncHandler(async (req, res, next) => {
  const { name } = req.params;

  const category = await Category.findOne({ name });
  const items = await Item.find({ category: category._id });

  res.json({ category, items });
});

exports.category_delete = asyncHandler(async (req, res, next) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ result: 'Success' });
});

exports.category_modify = asyncHandler(async (req, res, next) => {
  await Category.findByIdAndUpdate(req.params.id, {});

  // CRAETE VIRTUAL MEMORY FOR FILES TO BE UPLOADED
  const upload = multer({ storage: multer.memoryStorage() });

  upload.single('image')(req, res, async (err) => {
    if (err) {
      // HANDLE FILE UPLOAD ERRORS
      console.error(err);
      return res.status(400).json({ message: 'Error uploading file' });
    }

    // CONSOLE LOG REQ.FILE & REQ.BODY HERE
    // console.log('req.file : ', req.file);
    // console.log('req.body : ', req.body);

    if (req.file) {
      const resized = await sharp(req.file.buffer).resize({ width: 500 }).webp({ quality: 80 }).toBuffer();
      const b64 = resized.toString('base64'); // OPTIMIZED IMAGE
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const [cldRes, dummy] = await Promise.all([
        handleUpload(dataURI),
        handleDelete(req.body.imageID),
      ]);
      const category = await Category.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        description: req.body.description,
        image: { URL: cldRes.secure_url, cloudinaryID: cldRes.public_id },
      }, { new: true });
      res.json({ category });
    }
    else {
      const category = await Category.findByIdAndUpdate(req.body.id, { name: req.body.name, description: req.body.description }, { new: true });
      res.json({ category });
    }
  });
});
