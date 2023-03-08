const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db.config')

const BorrowBook = sequelize.define('borrow_book', {
    due: {
        type: DataTypes.DATEONLY,
    },
    isLate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

module.exports = BorrowBook