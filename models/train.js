const mongoose = require('mongoose');



const trainSchema=mongoose.Schema({
    trainNumber: String,
    name: String,
    source: String,
    destination: String,
    availableSeats: Number,
    departureTime: String,
    arrivalTime: String
});

module.exports = mongoose.model('train',trainSchema);