// CREATE EXPRESS ROUTER
const express = require('express');

const router = express.Router();

// IMPORT CONTROLLER MODULES
const { homepage, create_post } = require('../controllers/inventory.controller');

// CREATE ROUTES TO CALL CERTAIN CONTROLLER FUNCTIONS ON CERTAIN REQUESTS
router.get('/inventory/:selected', homepage);
router.post('/create/:selected', create_post);

// EXPORT ROUTER
module.exports = router;
