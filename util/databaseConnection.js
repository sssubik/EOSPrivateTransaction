const Sequelize = require('sequelize')

const sequelize = new Sequelize('eth','root','root',{
    dialect: 'mysql',
    host:'localhost',
    port: 3306
})
module.exports = sequelize;