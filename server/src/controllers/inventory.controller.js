// IMPORT GLOBALS
const Buffer = require('node:buffer');

// IMPORT USEFUL MIDDLEWARES
const asyncHandler = require('express-async-handler');
const sharp = require('sharp'); // OPTIMIZE IMAGES

// IMPORT HELPERS
const { handleUpload } = require('../helpers/cloudinary.helper');

// IMPORT MODELS YOU NEED DB INTERACTION
const Category = require('../models/category.model');
const Item = require('../models/item.model');

// DEFINE FUNCTION TO FETCH DATA & SEND INSIDE JSON WHEN CALLED
exports.homepage = asyncHandler(async (req, res, next) => {
  const { selected } = req.params;

  if (selected !== 'Category' && selected !== 'Item')
    return;

  if (selected === 'Category') {
    const result = await Category.find();
    res.json({ result });
  }

  if (selected === 'Item') {
    const result = await Item.find().populate('category');
    res.json({ result });
  }
});

// DEFINE FUNCTION TO FETCH DATA & SEND INSIDE JSON WHEN CALLED
exports.create_post = asyncHandler(async (req, res, next) => {
  const { selected } = req.params;

  if (selected !== 'Category' && selected !== 'Item')
    return;

  // CONSOLE LOG REQ.FILE & REQ.BODY HERE
  // console.log('req.file : ', req.file);
  // console.log('req.body : ', req.body);

  // const b64 = Buffer.Buffer.from(req.file.buffer).toString('base64'); // ORIGINAL IMAGE
  const resized = await sharp(req.file.buffer).resize({ width: 500 }).webp({ quality: 80 }).toBuffer();
  const b64 = resized.toString('base64'); // OPTIMIZED IMAGE
  const dataURI = `data:${req.file.mimetype};base64,${b64}`;
  const cldRes = await handleUpload(dataURI);

  const commonFields = {
    name: req.body.name,
    description: req.body.description,
    image: {
      URL: cldRes.secure_url,
      cloudinaryID: cldRes.public_id,
    },
    createdByIP: req.ip,
    createdLang: req.headers['accept-language'],
    createdRef: req.headers.referer,
  };

  if (selected === 'Category') {
    await Category.create({
      ...commonFields,
    });
  }

  if (selected === 'Item') {
    await Item.create({
      ...commonFields,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });
  }

  res.json({ cldRes });
});
