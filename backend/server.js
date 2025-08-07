// app.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors=require('cors')

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const apiUrl = process.env.pi;

app.use(express.json());
app.use(cors()) 

app.get('/news', async (req, res) => {
  try {
    const baseUrl = apiUrl.split('?')[0];

    const urlParams = new URLSearchParams(apiUrl.split('?')[1]);

    if (req.query.q) {
      urlParams.set('q', req.query.q);
    }

    const finalUrl = `${baseUrl}?${urlParams.toString()}`;

    const { data } = await axios.get(finalUrl);

    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
