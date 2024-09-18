const express = require('express');
const router = express.Router();

// Import users and router
const { users } = require('./users');

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
    const idAsNumber = parseInt(id, 10);
    if (isNaN(idAsNumber) || idAsNumber <= 0 || orders.some(o => o.id === id)) {
        return res.status(400).json({ message: 'ID must be a unique positive integer' });
    }

    // Validate quantity
    const quantityAsNumber = parseInt(quantity, 10);
    if (isNaN(quantityAsNumber) || quantityAsNumber <= 0) {
        return res.status(400).json({ message: 'Quantity must be a positive integer' });
    }

    // Validation for userId existence in users
    const userExists = users.find(u => u.id === userId);
    if (!userExists) {
        return res.status(400).json({ message: `User with ID ${userId} does not exist` });
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
