const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db.config')

const Permission = sequelize.define('permission', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
})

module.exports = Permission
