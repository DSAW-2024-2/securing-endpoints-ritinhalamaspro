const express = require('express');
const router = express.Router();

let products = [];

// Get all products
router.get('/', (req, res) => {
    res.json(products);
});

// Create products
router.post('/', (req, res) => {
    const { id, name, price, category } = req.body;

    // Validate JSON format
    if (typeof id !== 'string' || typeof name !== 'string' || typeof price !== 'string' || typeof category !== 'string') {
        return res.status(400).json({ message: 'Invalid JSON format' });
    }

    // Validate ID
    const idAsNumber = parseInt(id, 10);
    if (isNaN(idAsNumber) || idAsNumber <= 0 || products.some(p => p.id === id)) {
        return res.status(400).json({ message: 'ID must be a unique positive integer' });
    }

    // Validate price
    const priceAsNumber = parseFloat(price);
    if (isNaN(priceAsNumber) || priceAsNumber < 0) {
        return res.status(400).json({ message: 'Price must be a non-negative number' });
    }

    const newProduct = { id, name, price, category };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Get product by ID
router.get('/:id', (req, res) => {
    const product = products.find((p) => p.id === req.params.id);

    // Validate ID exist
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});

// Update a product by ID
router.put('/:id', (req, res) => {
    const productIndex = products.findIndex((p) => p.id === req.params.id);

    //Validate ID exist
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    // Validate JSON format
    const { name, price, category } = req.body;
    if (typeof name !== 'string' || typeof price !== 'string' || typeof category !== 'string') {
        return res.status(400).json({ message: 'Invalid JSON format' });
    }

    // Validate price
    const priceAsNumber = parseFloat(price);
    if (isNaN(priceAsNumber) || priceAsNumber < 0) {
        return res.status(400).json({ message: 'Price must be a non-negative number' });
    }

    products[productIndex] = { id: req.params.id, name, price, category };
    res.json(products[productIndex]);
});

// Delete a product by ID
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex((p) => p.id === req.params.id);

    // Validate ID exist
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products.splice(productIndex, 1);
    res.status(204).send();
});

module.exports = router;
