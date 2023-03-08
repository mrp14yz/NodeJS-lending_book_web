const { DataTypes } = require('sequelize')
const sequelize = require('./db.config')

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Category
    .sync()
    .then(() => {
        console.log('Table category created successfully')
    })
    .catch((err) => {
        console.error('Unable to create table category:', err)
    })

module.exports = Category