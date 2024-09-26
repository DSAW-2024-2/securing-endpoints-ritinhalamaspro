const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

// Import routes
const { router: usersRoutes } = require('./routes/users');
const { router: productsRoutes } = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const loginRoutes = require('./routes/login'); 

app.use(express.json()); // Parse incoming JSON requests

// Protect these routes with the JWT authentication middleware
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/login', loginRoutes); // Public route for login

// Handle 404 errors for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Path not found' });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
