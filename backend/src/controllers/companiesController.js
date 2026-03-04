const pool = require('../db');


const createCompany = async (req, res) => {
  try {
    const { name, number_of_shareholders, total_capital } = req.body;

    if (!name || !number_of_shareholders || !total_capital) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await pool.query(
      `INSERT INTO companies (name, number_of_shareholders, total_capital)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, number_of_shareholders, total_capital]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companiesResult = await pool.query(
      `SELECT * FROM companies ORDER BY created_at DESC`
    );

    const companies = companiesResult.rows;

    const companiesWithShareholders = await Promise.all(
      companies.map(async (company) => {
        const shareholdersResult = await pool.query(
          `SELECT * FROM shareholders WHERE company_id = $1`,
          [company.id]
        );
        return { ...company, shareholders: shareholdersResult.rows };
      })
    );

    res.json(companiesWithShareholders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const companyResult = await pool.query(
      `SELECT * FROM companies WHERE id = $1`,
      [id]
    );

    if (companyResult.rows.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const shareholdersResult = await pool.query(
      `SELECT * FROM shareholders WHERE company_id = $1`,
      [id]
    );

    const company = {
      ...companyResult.rows[0],
      shareholders: shareholdersResult.rows,
    };

    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createCompany, getAllCompanies, getCompanyById };