const express = require('express');
const cors = require('cors');
require('dotenv').config();

const companiesRouter = require('./routes/companies');
const shareholdersRouter = require('./routes/shareholders');

const app = express();

app.use(cors());
app.use(express.json()); 


app.use('/companies', companiesRouter);
app.use('/companies', shareholdersRouter);


app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});