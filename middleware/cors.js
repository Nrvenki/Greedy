const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
    // List of allowed origins
    const allowedOrigins = [
      'https://maptro.netlify.app',  // Your Production URL
      'http://localhost:5173',       // Your Local Vite App
      'http://localhost:3000'        // Standard React Port (Optional, good to have)
    ];

    // Allow requests with no origin (like Postman or server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Origin is allowed
    } else {
      callback(new Error('Not allowed by CORS')); // Blocked
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);