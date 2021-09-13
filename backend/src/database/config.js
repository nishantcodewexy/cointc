const fs = require('fs');

module.exports = {
  development: {
    username: 'cryptcon',
    password: 'cryptcon_pass',
    database: 'cryptcon',
    host: 'localhost',
    port: 3306,
    dialect: process.env.DB_DIALECT || 'postgre',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: process.env.DB_DIALECT || 'postgre',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.PRODUCTION_DB_USERNAME,
    password: process.env.PRODUCTION_DB_PASSWORD,
    database: process.env.PRODUCTION_DB_NAME,
    host: process.env.PRODUCTION_DB_HOSTNAME,
    port: process.env.PRODUCTION_DB_PORT,
    dialect: process.env.DB_DIALECT || 'postgre',
    // dialectOptions: {
    //   bigNumberStrings: true,
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
    //   }
    // }
  }
};