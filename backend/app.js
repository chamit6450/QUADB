const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://amitchauhanreal:amithp82@cluster0.acity2c.mongodb.net/');

// Define the schema for the data
const dataSchema = new mongoose.Schema({
  name: String,
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String
});

const Data = mongoose.model('Data', dataSchema);

// Fetch top 10 results from API and store in database
axios.get('https://api.wazirx.com/api/v2/tickers')
  .then(response => {
    const top10Results = response.data;
    top10Results.forEach(result => {
      const data = new Data({
        name: result.name,
        last: result.last,
        buy: result.buy,
        sell: result.sell,
        volume: result.volume,
        base_unit: result.base_unit
      });
      data.save();
    });
  })
  .catch(error => {
    console.error(error);
  });

// Create a route to get the stored data from the database
app.get('/api/data', async (req, res) => {
  const data = await Data.find().exec();
  res.json(data);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});