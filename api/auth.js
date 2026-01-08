const { getDatabase } = require('../config/db');
const User = require('../models/User');

async function authHandler(req, res) {
  // --- 1. SET CORS HEADERS MANUALLY ---
  // This ensures the browser knows who is allowed to connect
  const allowedOrigins = [
    'http://localhost:5173',      // Your Local Frontend
    'https://maptro.netlify.app'  // Your Live Frontend
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // --- 2. HANDLE PREFLIGHT (OPTIONS) REQUEST ---
  // If the browser asks "Can I connect?", say "Yes" immediately.
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // --- 3. NORMAL POST CHECK ---
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = await getDatabase();
    const userModel = new User(db);
    const { action, email, password, name } = req.body;

    if (action === 'signup') {
      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const result = await userModel.create({ name, email, password });
      return res.status(201).json({ 
        message: 'User created successfully',
        userId: result.insertedId 
      });
    }

    if (action === 'signin') {
      const user = await userModel.findByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      return res.status(200).json({ 
        message: 'Login successful',
        user: { id: user._id, name: user.name, email: user.email }
      });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = authHandler;