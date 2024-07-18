// CREATE EXPRESS ROUTER
const express = require('express');

const router = express.Router();

// IMPORT CONTROLLER MODULES
const { create_post } = require('../controllers/create.controller');

// CREATE ROUTES TO CALL CERTAIN CONTROLLER FUNCTIONS ON CERTAIN REQUESTS
router.post('/create/:selected', create_post);

// EXPORT ROUTER
module.exports = router;
