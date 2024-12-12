require('dotenv').config();

const config = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 3000,
  MODEL_URL: process.env.MODEL_URL,
};

module.exports = config;