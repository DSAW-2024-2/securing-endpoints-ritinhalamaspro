const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Asegúrate de cargar las variables de entorno aquí

// Rutas
const { router: usersRoutes } = require('./routes/users');
const { router: productsRoutes } = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const loginRoutes = require('./routes/login'); // Aquí está la ruta de login

app.use(express.json()); // Middleware para parsear JSON

// Usa las rutas
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/login', loginRoutes); // Aquí conectas la ruta de login

// Ruta para manejar errores 404 (no encontrada)
app.use((req, res) => {
  res.status(404).json({ message: 'Path not found' });
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
