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
  if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0 || users.some(p => p.id === id)) {
    return res.status(400).json({ message: 'ID must be a unique positive integer' });
    }

  // Validate age
  if (!/^\d+$/.test(age) || parseInt(age, 10) <= 0 || users.some(p => p.id === id)) {
    return res.status(400).json({ message: 'Age must be a positive integer' });
    }

  const newUser = { id, name, email, age };
  users.push(newUser);
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
    const { name, email, age } = req.body;

    //Validate ID exist
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Validate JSON format
    if (typeof name !== 'string' || typeof email !== 'string' || typeof age !== 'string') {
        return res.status(400).json({ message: 'Invalid JSON format' });
    }
    // Validate age
    if (!/^\d+$/.test(age) || parseInt(age, 10) <= 0) {
        return res.status(400).json({ message: 'Age must be a positive integer' });
    }

    users[userIndex] = { id: req.params.id, name, email, age };
    res.json(users[userIndex]);
});

// Delete user
router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });
    users.splice(index, 1);
    res.status(204).send();
});

// Export  users and the router
module.exports = { users, router };
