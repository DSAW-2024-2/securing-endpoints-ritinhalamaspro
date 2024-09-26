require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import Express framework
const jwt = require('jsonwebtoken'); // Import JWT library for token handling
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords
const router = express.Router(); // Create a new router instance

let adminPasswordHash; // Variable to hold the hashed admin password

(async () => {
    adminPasswordHash = await bcrypt.hash('admin', 10); // Hash the password 'admin'
})();

router.post('/', async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body

    if (!email || !password) {
        return res.status(400).send('Email and password are required'); // Validate that both fields are provided
    }

    try {
        // Check if the user's email is 'admin@admin.com' and the password matches the hashed password
        if (email === 'admin@admin.com' && await bcrypt.compare(password, adminPasswordHash)) {
            const user = { email }; // Create a user object to be included in the token payload

            // Generate the token with an expiration of 5 minutes
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
            
            res.json({ accessToken }); // Respond with the access token
        } else {
            return res.status(403).send('Invalid email or password'); // Invalid credentials
        }
    } catch (error) {
        return res.status(500).send('Server error'); // Handle server errors
    }
});

module.exports = router; // Export the router for use in other modules
