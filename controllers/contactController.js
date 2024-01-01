const path = require('path');
const db = require('../db'); // Ensure the correct path

exports.contact_page = (req, res) => {
    // Send the HTML file for donor registration
    res.sendFile(path.join(__dirname, '..', 'views', 'contact', 'contactUs.html'));
};

exports.contact_registration = async (req, res) => {
    try {
        // Extract user_id from session or other source
        const user_id = req.session.userId;

        // Extract form data from request body
        const { name, email, phone, queries} = req.body;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Prepare the database query
        const query = 'INSERT INTO contact (name, email, phone, queries,user_id) VALUES (?, ?, ?, ?, ?)';
        
        // Execute the query
        db.query(query, [name, email, phone, queries,user_id], async (error, result) =>{
            if (error){
                res.status(500).send(`Error registering new Customer: `+ error);
                return;
            }
            res.status(200).send('Contact registered successfully');

        })
        
    } catch (err) {
        console.error('Error caught:', err);
    
        // Check if the error is a MySQL error and has a sqlMessage
    
            res.status(500).send('Error registering new Contact');
    
    }
    
};