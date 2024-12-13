require('dotenv').config();

const config = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 3000,
};

module.exports = config;