const express = require('express');
const router = express.Router();


let users = [];

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Crete User
router.post('/', (req, res) => {
  const newUser = { id: Date.now().toString(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Get User
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
});

// Update User
router.put('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });

  users[index] = { id: req.params.id, ...req.body };
  res.json(users[index]);
});

// Delete user
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });

  users.splice(index, 1);
  res.json({ message: 'Usuario eliminado' });
});

module.exports = router;
