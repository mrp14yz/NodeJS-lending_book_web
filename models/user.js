const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db.config')
const Book = require('./book')
const BorrowBook = require('./borrowBook')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    role: {
        type: DataTypes.ENUM,
        values: ['admin', 'librarian', 'patron'],
        defaultValue: 'patron'
    }
})

User.belongsToMany(Book, {
    through: BorrowBook,
    foreignKey: 'useriId',
    onDelete: 'CASCADE'
})
Book.belongsToMany(User, {
    through: BorrowBook,
    foreignKey: 'bookId'
})

module.exports = User