const express = require('express');
const router = express.Router();

let products = [];

// Get all products
router.get('/', (req, res) => {
    res.json(products);
});

// Create products
router.post('/', (req, res) => {
    const newProduct = {
        id: String(products.length + 1),
        ...req.body,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Get product by ID
router.get('/:id', (req, res) => {
    const product = products.find((p) => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});

// Update a product by ID
router.put('/:id', (req, res) => {
    const productIndex = products.findIndex((p) => p.id === req.params.id);
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products[productIndex] = { id: req.params.id, ...req.body };
    res.json(products[productIndex]);
});

// Delete a product by ID
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex((p) => p.id === req.params.id);
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products.splice(productIndex, 1);
    res.status(204).send();
});

module.exports = router;
