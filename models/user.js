const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db.config')
const Book = require('./book')
const Borrow_Book = require('./borrow_book')
const path = require('path')

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
    photo: {
        type: DataTypes.STRING,
        get(){
            const fileName = this.getDataValue('photo')
            const userPhoto = path.join('public', 'uploads/userPhotos/')
            return fileName ? userPhoto + fileName : null
        }
    },
    phone: DataTypes.STRING,
    address: DataTypes.STRING
})

User.belongsToMany(Book, {
    through: Borrow_Book,
})
Book.belongsToMany(User, {
    through: Borrow_Book,
})

module.exports = User