// routes/decorations.js
const express = require('express');
const router = express.Router();
const Catering = require('../models/Catering');

// Handle form submission for adding decoration
router.post('/add', async (req, res) => {
  // Similar to rooms.js
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

// Handle form submission for updating decoration
router.post('/update/:id', async (req, res) => {
  // Similar to rooms.js
  const { id } = req.params;
  const { title, description, imageUrl, author } = req.body;
  try {
    const updatedCatering = await Room.findByIdAndUpdate(id, { title, description, imageUrl, author }, { new: true });
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Handle form submission for deleting decoration
router.post('/delete/:id', async (req, res) => {
  // Similar to rooms.js
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