// IMPORT USEFUL MIDDLEWARES
const asyncHandler = require('express-async-handler');
const sharp = require('sharp'); // OPTIMIZE IMAGES

// IMPORT HELPERS
const { handleUpload, handleDelete } = require('../helpers/cloudinary.helper');

// IMPORT MODELS YOU NEED DB INTERACTION
const Category = require('../models/category.model');
const Item = require('../models/item.model');

// DEFINE FUNCTION TO FETCH DATA & SEND INSIDE JSON WHEN CALLED
exports.item_get = asyncHandler(async (req, res, next) => {
  const { selected, id } = req.params;

  if (selected === 'Category') {
    const category = await Category.findById(id);
    const items = await Item.find({ category: category._id });
    res.json({ category, items });
  }
  else {
    const item = await Item.findById(id).populate('category');
    res.json({ item });
  }
});

exports.item_delete = asyncHandler(async (req, res, next) => {
  const { selected, id, items, imageID } = req.params;
  const options = { createdBy: { $ne: 'Admin' } };

  if (selected === 'Category' && !items) {
    const deletedCategory = await Category.findByIdAndDelete(id, options);
    if (deletedCategory)
      await handleDelete(imageID);
    res.json({ result: 'Success' });
  }

  if (selected === 'Item') {
    const deletedItem = await Item.findByIdAndDelete(id, options);
    if (deletedItem)
      await handleDelete(imageID);
    res.json({ result: 'Success' });
  }
});

exports.item_modify = asyncHandler(async (req, res, next) => {
  if (req.body.createdBy === 'Admin')
    return;

  const { id, name, description, price, stock, category, imageID } = req.body;

  // CONSOLE LOG REQ.FILE & REQ.BODY HERE
  // console.log('req.file : ', req.file);
  // console.log('req.body : ', req.body);

  if (req.file) {
    // const b64 = Buffer.Buffer.from(req.file.buffer).toString('base64'); // ORIGINAL IMAGE
    const resized = await sharp(req.file.buffer).resize({ width: 500 }).webp({ quality: 80 }).toBuffer();
    const b64 = resized.toString('base64'); // OPTIMIZED IMAGE
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const [cldRes, dummy] = await Promise.all([
      handleUpload(dataURI),
      handleDelete(imageID),
    ]);

    if (req.params.selected === 'Category') {
      const result = await Category.findByIdAndUpdate(id, {
        name,
        description,
        image: { URL: cldRes.secure_url, cloudinaryID: cldRes.public_id },
      }, { new: true });
      res.json({ result });
    }
    else {
      const result = await Item.findByIdAndUpdate(id, {
        name,
        description,
        price,
        stock,
        category,
        image: { URL: cldRes.secure_url, cloudinaryID: cldRes.public_id },
      }, { new: true });
      res.json({ result });
    }
  }
  else {
    if (req.params.selected === 'Category') {
      const result = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
      res.json({ result });
    }
    else {
      const result = await Item.findByIdAndUpdate(id, { name, description, price, stock, category }, { new: true }).populate('category');
      res.json({ result });
    }
  }
});
