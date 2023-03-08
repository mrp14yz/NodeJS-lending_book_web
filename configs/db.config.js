const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT
    }
)

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to mysql successfully')
    })
    .catch((err) => {
        console.error('Unable to connect database:', err)
    })

module.exports = sequelize