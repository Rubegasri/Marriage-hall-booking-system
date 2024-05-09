// routes/photography.js
const express = require('express');
const router = express.Router();
const Photography = require('../models/Photography');

// Handle form submission for adding photography
router.post('/add', async (req, res) => {
  const { title, description, imageUrl, author } = req.body;
  const photography = new Photography({
    title,
    description,
    imageUrl,
    author
  });
  try {
    await photography.save();
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Handle form submission for updating photography
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, imageUrl, author } = req.body;
  try {
    const updatedPhotography = await Photography.findByIdAndUpdate(id, { title, description, imageUrl, author }, { new: true });
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Handle form submission for deleting photography
router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Photography.findByIdAndDelete(id);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
