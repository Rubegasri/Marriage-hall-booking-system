const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Catering = require('./models/Catering');

const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/cateringDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes

// Render admin page with caterings
app.get('/admin', async (req, res) => {
  try {
    const caterings = await Catering.find();
    res.render('admin/admin', { caterings });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Handle form submission for adding catering
app.post('/admin/add', async (req, res) => {
  const { title, description, imageUrl, author } = req.body;
  const catering = new Catering({
    title,
    description,
    imageUrl,
    author
  });
  try {
    await catering.save();
    res.redirect('/admin'); // Redirect to admin page after adding catering
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Serve catering.ejs page
app.get('/catering', async (req, res) => {
  try {
    const caterings = await Catering.find();
    res.render('catering', { caterings }); // Render catering.ejs with catering data
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
// index.js
// Handle form submission for updating catering
app.post('/admin/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, imageUrl, author } = req.body;
  try {
    // Find the catering item by id and update its properties
    await Catering.findByIdAndUpdate(id, { title, description, imageUrl, author });
    res.redirect('/admin'); // Redirect to admin page after updating catering
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
// Handle form submission for deleting catering
app.post('/admin/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Catering.findByIdAndDelete(id);
    res.redirect('/admin'); // Redirect to admin page after successful deletion
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});