const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db.config')
const Book = require('./book')

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: DataTypes.STRING
})

Category.hasMany(Book, { onDelete: 'SET NULL' })
Book.belongsTo(Category)

module.exports = Category