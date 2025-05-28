require('dotenv').config(); //load environment varibles

const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path'); // To serve static files like CSS, JS, images

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(express.json()); // To parse JSON data

// Serve static files (HTML, CSS, JS, images) from the current directory
app.use(express.static(path.join(__dirname)));

// Basic Server-Side Validation (mirroring front-end for robustness)
function validateBookingData(data) {
    const errors = {};
    if (!data.name || data.name.trim() === '') errors.name = 'Name is required.';
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) errors.email = 'Valid email is required.';
    if (data.phone && !/^\+?[\d\s()-]{7,}$/.test(data.phone)) errors.phone = 'Invalid phone number format.';
    if (!data.date) errors.date = 'Preferred date is required.';
    if (!data.time) errors.time = 'Preferred time is required.';
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // This is the boutique's email account the server uses to SEND
        pass: process.env.EMAIL_PASS  // The App Password for EMAIL_USER
    }
});

// API Endpoint for Form Submission
app.post('/api/submit-booking', (req, res) => {
    const formData = req.body;
    console.log('Received booking data:', formData);

    const validationResult = validateBookingData(formData);
    if (!validationResult.isValid) {
        console.log('Server-side validation failed:', validationResult.errors);
        return res.status(400).json({ success: false, message: 'Validation failed.', errors: validationResult.errors });
    }

    const mailOptions = {
        from: `"Boutique Name Booking" <${process.env.EMAIL_USER}>`, // The "from" address, using the server's sending email
        to: process.env.CLIENT_NOTIFICATION_EMAIL, // This is the email where the boutique owner RECEIVES the booking
        replyTo: formData.email, // So the boutique can directly reply to the customer
        subject: 'New Private Viewing Request',
        html: `
            <h2>New Booking Request</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email (Customer):</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
            <p><strong>Preferred Date:</strong> ${formData.date}</p>
            <p><strong>Preferred Time:</strong> ${formData.time}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send booking request. Please try again later.' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ success: true, message: 'Booking request submitted successfully!' });
    });
});

// Serve the main HTML file for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});