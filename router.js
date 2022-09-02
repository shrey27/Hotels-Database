const hotels = require('./database.js');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const mySecret = process.env['GOOGLE_KEY']

router.route("/")
  .post(async (req, res) => {
    const { input } = req.body;
    let URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${mySecret}`
    let response = await axios.get(URL)
    let dataSet = response.data.predictions.map(item => item.description)
    let search = input.toLowerCase();
    let hotelSet = hotels.filter(hotel => hotel.title.toLowerCase().includes(search) || hotel.address.toLowerCase().includes(search));
    let result = { locations: dataSet, hotels: hotelSet }
    res.json(result);
  })

module.exports = router;