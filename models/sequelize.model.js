const Sequelize = require('sequelize');
module.exports = new Sequelize('kayanegy_kayan','kayanegy_kayanegypt','V2v5=lau2Oj9', { 
    host: 'kayan-egypt.com',
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });
