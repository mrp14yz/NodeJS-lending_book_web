const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db.config')

const Books = sequelize.define('books', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    isbn: DataTypes.STRING(13),
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total_pages: DataTypes.INTEGER,
    cover: DataTypes.STRING,
    description: DataTypes.TEXT
})

Books
    .sync()
    .then(() => {
        console.log('Table books created successfully')
    })
    .catch((err) => {
        console.error('Unable to create table', err)
    })

module.exports = Books