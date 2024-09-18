let users = [];

const express = require('express');
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Create User
router.post('/', (req, res) => {
  const { id, name, email, age } = req.body;

  // Validate JSON format
  if (typeof id !== 'string' || typeof name !== 'string' || typeof email !== 'string' || typeof age !== 'string') {
      return res.status(400).json({ message: 'Invalid JSON format' });
  }

  // Validate ID
  const idAsNumber = parseInt(id, 10);
  if (isNaN(idAsNumber) || idAsNumber <= 0 || users.some(p => p.id === id)) {
      return res.status(400).json({ message: 'ID must be a unique positive integer' });
  }

  // Validate age
  const ageAsNumber = parseInt(age);
  if (isNaN(ageAsNumber) || ageAsNumber < 0) {
      return res.status(400).json({ message: 'Age must be a non-negative number' });
  }

  const newUser = { id, name, email, age };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Export  users and the router
module.exports = { users, router };
