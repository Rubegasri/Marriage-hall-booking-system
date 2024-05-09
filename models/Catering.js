// models/Catering.js
const mongoose = require('mongoose');

const cateringSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  author: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Catering', cateringSchema);
