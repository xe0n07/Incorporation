const express = require('express');
const router = express.Router();
const { createShareholders } = require('../controllers/shareholdersController');

router.post('/:id/shareholders', createShareholders);

module.exports = router;