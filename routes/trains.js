const express = require('express');
const router = express.Router();
const Train = require('../models/Train');

// Get trains between two stations
router.get('/search', async (req, res) => {
  const { source, destination } = req.query;
  try {
    const trains = await Train.find({ source, destination });
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;