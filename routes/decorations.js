// routes/decorations.js
const express = require('express');
const router = express.Router();
const Decoration = require('../models/Decoration');

// Handle form submission for adding decoration
router.post('/add', async (req, res) => {
  const { title, description, imageUrl, author } = req.body;
  const decoration = new Decoration({
    title,
    description,
    imageUrl,
    author
  });
  try {
    await decoration.save();
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Handle form submission for updating decoration
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, imageUrl, author } = req.body;
  try {
    const updatedDecoration = await Decoration.findByIdAndUpdate(id, { title, description, imageUrl, author }, { new: true });
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Handle form submission for deleting decoration
router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Decoration.findByIdAndDelete(id);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
