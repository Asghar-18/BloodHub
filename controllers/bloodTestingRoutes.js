const path = require('path');
const db = require('../db'); // Ensure the correct path

exports.donor_page = (req, res) => {
    // Send the HTML file for donor registration
    res.sendFile(path.join(__dirname, '..', 'views', 'donor-registration', 'bloodTesting.html'));
};

exports.donor_registration = async (req, res) => {
    try {
        // Extract user_id from session or other source
        const user_id = req.session.userId;

        // Extract form data from request body
        const { full_name, email, phone_number, blood_type, medical_history, appointment_date } = req.body;

        // TODO: Add input validation and sanitization here

        // Prepare the database query
        const query = 'INSERT INTO donors (user_id, full_name, email, phone_number, blood_type, medical_history, appointment_date) VALUES (?, ?, ?, ?, ?, ?)';
        
        // Execute the query
        db.query(query, [user_id, full_name, email, phone_number, blood_type, medical_history, appointment_date], async (error, result) =>{
            if (error){
                res.status(500).send(`Error registering new donor: `+ error);
            }
            res.status(200).send('Donor registered successfully');

        })
    } catch (err) {
        console.error('Error caught:', err);
    
        // Check if the error is a MySQL error and has a sqlMessage
    
            res.status(500).send('Error registering new donor');
    
    }
    
};
