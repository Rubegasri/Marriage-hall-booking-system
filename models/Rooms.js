// models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  author: String
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
