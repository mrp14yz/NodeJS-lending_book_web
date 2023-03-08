const Book = require('./book')
const User = require('./user')
const Category = require('./category')
const Author = require('./author')
const BorrowBook = require('./borrowBook')
const sequelize = require('../configs/db.config')

//sequelize.sync()

Author.hasMany(Book, {
    onDelete: 'CASCADE'
})
Book.belongsTo(Author)

Category.hasMany(Book, {
    onDelete: 'SET NULL'
})
Book.belongsTo(Category)

User.belongsToMany(Book, {
    through: BorrowBook,
    foreignKey: 'useriId',
    onDelete: 'CASCADE'
})
Book.belongsToMany(User, {
    through: BorrowBook,
    foreignKey: 'bookId'
})

module.exports = {
    Book,
    User,
    Category,
    Author
}