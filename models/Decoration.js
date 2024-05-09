// models/Decoration.js
const mongoose = require('mongoose');

const decorationSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  author: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Decoration', decorationSchema);
