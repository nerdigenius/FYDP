require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
};