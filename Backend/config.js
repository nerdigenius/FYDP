require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/signup_login_db',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
};