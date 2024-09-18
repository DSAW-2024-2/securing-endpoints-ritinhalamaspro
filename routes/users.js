const express = require('express');
const router = express.Router();

let users = [];

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Create User
// Create products
router.post('/', (req, res) => {
  const { id, name, email, age } = req.body;

  // Validate JSON format
  if (typeof id !== 'string' || typeof name !== 'string' || typeof email !== 'string' || typeof age !== 'string') {
      return res.status(400).json({ message: 'Invalid JSON format' });
  }

  // Validate ID
  const idAsNumber = parseInt(id, 10);
  if (isNaN(idAsNumber) || idAsNumber <= 0 || products.some(p => p.id === id)) {
      return res.status(400).json({ message: 'ID must be a unique positive integer' });
  }

  // Validate age
  const ageAsNumber = parseInt(age);
  if (isNaN(ageAsNumber) || ageAsNumber < 0) {
      return res.status(400).json({ message: 'age must be a non-negative number' });
  }

  const newUser = { id, name, price, category };
  products.push(newUser);
  res.status(201).json(newUser);
});

// Get User
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Update User
router.put('/:id', (req, res) => {
  const userIndex = users.findIndex((p) => p.id === req.params.id);

  //Validate ID exist
  if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
  }

  // Validate JSON format
  const { name, email, age } = req.body;
  if (typeof name !== 'string' || typeof email !== 'string' || typeof age !== 'string') {
      return res.status(400).json({ message: 'Invalid JSON format' });
  }

  // Validate price
  const ageAsNumber = parseInt(price);
  if (isNaN(ageAsNumber) || ageAsNumber < 0) {
      return res.status(400).json({ message: 'Price must be a non-negative number' });
  }

  users[userIndex] = { id: req.params.id, name, price, category };
  res.json(users[userIndex]);
});

// Delete user
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
