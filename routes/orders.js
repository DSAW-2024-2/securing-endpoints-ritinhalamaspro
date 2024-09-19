// Import users, products and router
const express = require('express');
const router = express.Router();
const { users } = require('./users');
const { products } = require('./products');

let orders = [];

// Get all orders
router.get('/', (req, res) => {
    res.json(orders);
});

// Create a new order
router.post('/', (req, res) => {
    const { id, userId, productId, quantity, status } = req.body;

    // Validate JSON format
    if (typeof id !== 'string' || typeof userId !== 'string' || typeof productId !== 'string' || typeof status !== 'string' || typeof quantity !== 'string') {
        return res.status(400).json({ message: 'Invalid JSON format' });
    }

    // Validate ID
    if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0 || orders.some(p => p.id === id)) {
        return res.status(400).json({ message: 'ID must be a unique positive integer' });
    }

    // Validate quantity
    if (!/^\d+$/.test(quantity) || parseInt(quantity, 10) <= 0) {
        return res.status(400).json({ message: 'quantity must be a positive integer' });
    }

    // Validation for userId existence in users
    const userExists = users.find(u => u.id === userId);
    if (!userExists) {
        return res.status(400).json({ message: `User with ID ${userId} does not exist` });
    }

    // Validate productId existence in products
    const productExists = products.find(p => p.id === productId);
    if (!productExists) {
        return res.status(400).json({ message: `Product with ID ${productId} does not exist` });
    }

    const newOrder = { id, userId, productId, quantity, status };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// Get order by ID
router.get('/:id', (req, res) => {
    const order = orders.find((o) => o.id === req.params.id);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
});

module.exports = router;