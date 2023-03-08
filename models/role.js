const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db.config')

const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
})