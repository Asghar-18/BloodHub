const path = require('path');
const db = require('../db'); // Ensure the correct path

exports.customer_page = (req, res) => {
    // Send the HTML file for donor registration
    res.sendFile(path.join(__dirname, '..', 'views', 'donor-registration', 'Customer.html'));
};

exports.customer_registration = async (req, res) => {
    try {
        // Extract user_id from session or other source
        const user_id = req.session.userId;

        // Extract form data from request body
        const { full_name, email, phone_number, appointment_date, blood_type, reason} = req.body;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Prepare the database query
        const query = 'INSERT INTO customers (user_id, full_name, email, phone_number, appointment_date,  blood_type, reason) VALUES (?, ?, ?, ?, ?, ?,?)';
        
        // Execute the query
        db.query(query, [user_id, full_name, email, phone_number, appointment_date, blood_type, reason], async (error, result) =>{
            if (error){
                res.status(500).send(`Error registering new Customer: `+ error);
                return;
            }
            res.status(200).send('Customer registered successfully');

        })
        
    } catch (err) {
        console.error('Error caught:', err);
    
        // Check if the error is a MySQL error and has a sqlMessage
    
            res.status(500).send('Error registering new Customer');
    
    }
    
};