const pool = require('../db');

const createShareholders = async (req, res) => {
  try {
    const { id } = req.params;
    const { shareholders } = req.body;

    const companyCheck = await pool.query(
      `SELECT * FROM companies WHERE id = $1`, [id]
    );
    if (companyCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const company = companyCheck.rows[0];
    if (shareholders.length !== company.number_of_shareholders) {
      return res.status(400).json({
        error: `Expected ${company.number_of_shareholders} shareholders`
      });
    }

    const insertedShareholders = await Promise.all(
      shareholders.map(async (s) => {
        const result = await pool.query(
          `INSERT INTO shareholders (company_id, first_name, last_name, nationality)
           VALUES ($1, $2, $3, $4) RETURNING *`,
          [id, s.first_name, s.last_name, s.nationality]
        );
        return result.rows[0];
      })
    );

    await pool.query(
      `UPDATE companies SET status = 'complete' WHERE id = $1`, [id]
    );

    res.status(201).json({ message: 'Shareholders saved', shareholders: insertedShareholders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createShareholders };