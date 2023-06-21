const dbConfig = require('../config/dbConfig')

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }

}
)
sequelize.authenticate()
    .then(() => console.log("Connected..."))
    .catch((err) => console.log(err))

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize
db.users = require('./userModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false }).then(() => console.log("sync"))

module.exports = db