const { getDatabase } = require('../config/db');

async function dashboardHandler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = await getDatabase();
    const dashboardData = {
      batteryHealth: 76,
      efficiency: 20,
      consumption: 163,
      thisWeek: 1.342,
      charging: 68,
      timeToFullCharge: '0h 58min',
      wallet: 32984,
      averageRange: 35,
      consumablesCost: 2400,
      maintenanceCost: 5000,
      utilizationData: [100, 80, 60, 100, 80, 100, 60, 100],
      utilizationChange: 2.3
    };

    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = dashboardHandler;
