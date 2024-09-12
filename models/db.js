const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('startkbank_safetech_webhook', 'user', 'pass', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false
});
// sequelize.sync({alter: true})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
