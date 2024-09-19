const express = require('express');
const app = express();

// Extract the router from users.js
const { router: usersRoutes } = require('./routes/users');
const {router: productsRoutes} = require('./routes/products');
const ordersRoutes = require('./routes/orders');

app.use(express.json()); // Middleware

// Use the routes
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

// Route not found
app.use((req, res) => {
  res.status(404).json({ message: 'Path not found' });
});

// Initialize the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
