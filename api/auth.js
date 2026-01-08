const { getDatabase } = require('../config/db');
const User = require('../models/User');

async function authHandler(req, res) {
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
