// routes/rooms.js
const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Handle form submission for adding room
router.post('/add', async (req, res) => {
  const { title, description, imageUrl, author } = req.body;
  const room = new Room({
    title,
    description,
    imageUrl,
    author
  });
  try {
    await room.save();
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Handle form submission for updating room
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, imageUrl, author } = req.body;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, { title, description, imageUrl, author }, { new: true });
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Handle form submission for deleting room
router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Room.findByIdAndDelete(id);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
