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
exports.item_get = asyncHandler(async (req, res, next) => {
  const { selected, name } = req.params;

  if (selected === 'Category') {
    const category = await Category.findOne({ name });
    const items = await Item.find({ category: category._id });
    res.json({ category, items });
  }
  else {
    const item = await Item.findOne({ name }).populate('category');
    res.json({ item });
  }
});

exports.item_delete = asyncHandler(async (req, res, next) => {
  const deleteOptions = { createdBy: { $ne: 'Admin' } };
  if (req.params.selected === 'Category' && req.body.items.length === 0) {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id, deleteOptions);
    if (deletedCategory) { // Check if document was deleted (not created by Admin)
      await handleDelete(req.body.imageID);
    }
    res.json({ result: 'Success' });
  }

  if (req.params.selected === 'Item') {
    const deletedItem = await Item.findByIdAndDelete(req.params.id, deleteOptions);
    if (deletedItem) { // Check if document was deleted (not created by Admin)
      await handleDelete(req.body.imageID);
    }
    res.json({ result: 'Success' });
  }
});

exports.item_modify = asyncHandler(async (req, res, next) => {
  if (req.body.createdBy === 'Admin')
    return;

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
      // const b64 = Buffer.Buffer.from(req.file.buffer).toString('base64'); // ORIGINAL IMAGE
      const resized = await sharp(req.file.buffer).resize({ width: 500 }).webp({ quality: 80 }).toBuffer();
      const b64 = resized.toString('base64'); // OPTIMIZED IMAGE
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const [cldRes, dummy] = await Promise.all([
        handleUpload(dataURI),
        handleDelete(req.body.imageID),
      ]);
      if (req.params.selected === 'Category') {
        const result = await Category.findByIdAndUpdate(req.body.id, {
          name: req.body.name,
          description: req.body.description,
          image: { URL: cldRes.secure_url, cloudinaryID: cldRes.public_id },
        }, { new: true });
        res.json({ result });
      }
      else {
        const result = await Item.findByIdAndUpdate(req.body.id, {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock,
          category: req.body.category,
          image: { URL: cldRes.secure_url, cloudinaryID: cldRes.public_id },
        }, { new: true });
        res.json({ result });
      }
    }
    else {
      if (req.params.selected === 'Category') {
        const result = await Category.findByIdAndUpdate(
          req.body.id,
          { name: req.body.name, description: req.body.description },
          { new: true },
        );
        res.json({ result });
      }
      else {
        const result = await Item.findByIdAndUpdate(
          req.body.id,
          { name: req.body.name, description: req.body.description, price: req.body.price, stock: req.body.stock, category: req.body.category },
          { new: true },
        ).populate('category');
        res.json({ result });
      }
    }
  });
});
