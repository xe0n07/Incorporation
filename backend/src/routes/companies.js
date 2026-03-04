const express = require('express');
const router = express.Router();
const { createCompany, getAllCompanies, getCompanyById } = require('../controllers/companiesController');

router.post('/', createCompany);
router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);

module.exports = router;