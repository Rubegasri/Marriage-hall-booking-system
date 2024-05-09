// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//     service: String,
//     advance: Number,
//     date: Date,
//     paymentMethod: String,
//     email: String,
//     phone: String
// });

// module.exports = mongoose.model('Booking', bookingSchema);
// models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: Date,
    service: String,
    advance: Number
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
