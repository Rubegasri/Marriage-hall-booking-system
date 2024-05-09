// const Payment = require('../models/Booking');
// const emailService = require('../services/emailService');
// // const smsService = require('../services/smsService');
// const paymentGateway = require('../services/paymentGateway');

// exports.confirmPayment = async (req, res) => {
//     try {
//         const bookingId = req.params.id;
//         const booking = await Payment.findById(bookingId);

//         // Process payment with payment gateway
//         const paymentResponse = await paymentGateway.processPayment(req.body);

//         // Send email confirmation
//         await emailService.sendConfirmationEmail(booking.email, booking);

//         // Send SMS confirmation
//         // await smsService.sendConfirmationSMS(booking.phone, booking);

//         res.render('confirmation', { booking });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// };
