const express = require('express');
const corsMiddleware = require('../middleware/cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authHandler = require('./auth');
const dashboardHandler = require('./dashboard');
const vehiclesHandler = require('./vehicles');

// API Routes
app.post('/api/auth', authHandler);
app.get('/api/dashboard', dashboardHandler);
app.get('/api/vehicles', vehiclesHandler);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'MOPTro Backend API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});

module.exports = app;
