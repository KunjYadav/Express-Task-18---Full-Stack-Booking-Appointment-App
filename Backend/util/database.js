const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Kp@7000584374', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;