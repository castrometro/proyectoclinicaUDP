require('dotenv').config();

const config = {
  development: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'app_user',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'salud_odontologia_udp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },
  test: {
    host: process.env.TEST_DB_HOST || 'localhost',
    user: process.env.TEST_DB_USER || 'test_user',
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME || 'salud_odontologia_udp_test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },
  production: {
    host: process.env.PROD_DB_HOST,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];