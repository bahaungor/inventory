// CREATE EXPRESS ROUTER
const express = require('express');

const router = express.Router();
// IMPORT USEFUL MIDDLEWARES
const multer = require('multer'); // HANDLE MULTIPART FORM
// CRAETE VIRTUAL MEMORY FOR FILES TO BE UPLOADED
const upload = multer({ storage: multer.memoryStorage() });

// IMPORT CONTROLLER MODULES
const { homepage, create_post } = require('../controllers/inventory.controller');
const { item_get, item_delete, item_modify } = require('../controllers/category.controller');

// IMPORT VALIDATORS
const { createValidator } = require('../validators/item.create.validator');

// CREATE ROUTES TO CALL CERTAIN CONTROLLER FUNCTIONS ON CERTAIN REQUESTS
router.get('/inventory/:selected', homepage);
router.post(
  '/create/:selected', // WHEN '/create/${selected}' GETS POST REQUEST
  upload.single('image'), // PARSE 'image' FIELD IN REQUEST BODY
  createValidator, // VALIDATE FIELDS IN req.body AFTER MULTER !!!
  create_post, // ACCESS PARSED FILE IN CONTROLLER FUNC VIA req.file
);
router.get('/inventory/:selected/:id', item_get);
router.delete('/:selected/:id/', item_delete);
router.patch(
  '/:selected/:id', // WHEN '/${selected}/${id}' GETS PATCH REQUEST
  upload.single('image'), // PARSE 'image' FIELD IN REQUEST BODY
  createValidator, // VALIDATE FIELDS IN req.body AFTER MULTER !!!
  item_modify, // ACCESS PARSED FILE IN CONTROLLER FUNC VIA req.file
);

// EXPORT ROUTER
module.exports = router;
