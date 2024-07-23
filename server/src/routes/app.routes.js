// CREATE EXPRESS ROUTER
const express = require('express');

const router = express.Router();

// IMPORT CONTROLLER MODULES
const { homepage, create_post } = require('../controllers/inventory.controller');
const { category_get, category_delete, category_modify } = require('../controllers/category.controller');

// CREATE ROUTES TO CALL CERTAIN CONTROLLER FUNCTIONS ON CERTAIN REQUESTS
router.get('/inventory/:selected', homepage);
router.post('/create/:selected', create_post);
router.get('/Category/:name', category_get);
router.delete('/Category/:id', category_delete);
router.patch('/Category/:id', category_modify);

// EXPORT ROUTER
module.exports = router;
