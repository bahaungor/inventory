// CREATE EXPRESS ROUTER
const express = require('express');

const router = express.Router();

// IMPORT CONTROLLER MODULES
const { homepage, create_post } = require('../controllers/inventory.controller');
const { item_get, item_delete, item_modify } = require('../controllers/category.controller');

// IMPORT VALIDATORS
const { createValidator } = require('../validators/item.create.validator');

// CREATE ROUTES TO CALL CERTAIN CONTROLLER FUNCTIONS ON CERTAIN REQUESTS
router.get('/inventory/:selected', homepage);
router.post('/create/:selected', create_post);
router.get('/:selected/:name', item_get);
router.delete('/:selected/:id/', item_delete);
router.patch('/:selected/:id', item_modify);

// EXPORT ROUTER
module.exports = router;
