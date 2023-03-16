const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db.config')

const Borrow_Book = sequelize.define('borrow_book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    due: DataTypes.DATE,
    status: {
        type: DataTypes.ENUM(['process', 'accepted', 'declined' ,'returned']),
        defaultValue: 'process'
    },
    isLate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

module.exports = Borrow_Book