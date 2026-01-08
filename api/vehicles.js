const { getDatabase } = require('../config/db');
const Vehicle = require('../models/Vehicle');

async function vehiclesHandler(req, res) {
  try {
    const db = await getDatabase();
    const vehicleModel = new Vehicle(db);

    if (req.method === 'GET') {
      const vehicles = [
        {
          id: 1,
          name: 'WASP',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
          image: '/vehicles/wasp.jpg'
        },
        {
          id: 2,
          name: 'SNAIL',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
          image: '/vehicles/snail.jpg'
        },
        {
          id: 3,
          name: 'B',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
          image: '/vehicles/b.jpg'
        }
      ];

      return res.status(200).json(vehicles);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Vehicles error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = vehiclesHandler;
