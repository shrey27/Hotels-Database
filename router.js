const hotels = require('./database.js');
const express = require('express');
const router = express.Router();

router.route("/").get((_, res) => {
    res.json(hotels)
})

module.exports = router;