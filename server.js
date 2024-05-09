const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => console.log(err));

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Define booking schema and model
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: Date,
  service: [String],
  advance: Number
});

const Booking = mongoose.model('Booking', bookingSchema);

// Routes

// Render index page
app.get('/', (req, res) => {
  res.render('index');
});

// Render booking page
app.get('/booking', (req, res) => {
  res.render('booking');
});

// Serve booked dates
app.get('/booking/dates', async (req, res) => {
  try {
    const bookedDates = await Booking.distinct('date').exec();
    console.log("Booked Dates:", bookedDates); // Add this line for debugging
    res.json(bookedDates);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching booked dates');
  }
});

// Payment page route
app.post('/payment', async (req, res) => {
  try {
    const bookingData = req.body;
    // Ensure service is always an array
    if (!Array.isArray(bookingData.service)) {
      bookingData.service = [bookingData.service];
    }
    const booking = new Booking(bookingData);
    await booking.save();
    res.render('payment', { bookingData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while processing payment');
  }
});

// Handle confirmation page route
app.get('/confirm', (req, res) => {
  res.render('confirm');
});

app.post('/confirm', (req, res) => {
  // Handle the POST request for confirmation here
  // For example, you can retrieve booking data from the request body
  // and then render a confirmation page or perform any necessary actions
  res.render('confirm'); // Render the confirmation page
});

app.get('/payment', (req, res) => {
  // Retrieve email from query parameters
  const { email } = req.query;
  // Render payment page with email data
  res.render('payment', { email });
});

// Confirm booking route
app.post('/confirm', (req, res) => {
  const { email } = req.body;
  // Send confirmation email to the provided email address
  sendConfirmationEmail(email);
  // Handle confirmation
  res.send('Booking confirmed!');
});

// Function to send confirmation email


  // Send email
 

// Signup route
app.get('/auth/signup', (req, res) => {
  res.render('auth/signup');
});

// Handle signup form submission
app.post('/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.send('Signup successful!');
  } catch (err) {
    console.error(err);
    res.send('Error signing up');
  }
});

// Render login page
app.get('/auth/login', (req, res) => {
  res.render('auth/login');
});

// Handle login form submission
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      // Redirect to index page upon successful login
      res.redirect('/');
    } else {
      res.send('Invalid username or password.');
    }
  } catch (err) {
    console.error(err);
    res.send('Error logging in');
  }
});
// Handle signup form submission
// Signup route
app.get('/signup', (req, res) => {
  res.render('signup'); // Assuming your signup page is named signup.ejs and located in the 'views' directory
});

// Handle signup form submission
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Here you should handle user creation, for example:
    // const user = await User.create({ username, email, password });
    // res.send('Signup successful!');
    // For now, let's just redirect to the login page
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.send('Error signing up');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
