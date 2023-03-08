const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db.config')

const Author = sequelize.define('author', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Author
    .sync()
    .then(() => {
        console.log('Table author created successfully')
    })
    .catch((err) => {
        console.error('Unable to create table author:', err)
    })

module.exports = Author