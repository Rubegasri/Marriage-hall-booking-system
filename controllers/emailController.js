// const transporter = require('../services/emailService');

// // Function to send verification email
// const sendVerificationEmail = (email, verificationToken) => {
//     const mailOptions = {
//         from: 'your_email@gmail.com', // Sender address (must be your Gmail address)
//         to: email, // Receiver email address
//         subject: 'Email Verification', // Subject line
//         html: `
//             <h1>Verify Your Email</h1>
//             <p>Please click the following link to verify your email:</p>
//             <a href="http://yourwebsite.com/verify/${verificationToken}">Verify Email</a>
//         `
//     };

//     transporter.sendMail(mailOptions, function(error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// };

// module.exports = {
//     sendVerificationEmail
// };
