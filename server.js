const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/exchange-rate-history/:currency', async (req, res) => {
  const currency = req.params.currency;
  // Fetch data from the exchange rate API
  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/history/${currency}?start_at=${startDate}&end_at=${endDate}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
