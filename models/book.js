const { DataTypes, Op } = require('sequelize')
const sequelize = require('../configs/db.config')
const path = require('path')
const fs = require('fs')

const Book = sequelize.define('book', {
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
    slug: DataTypes.STRING,
    publish: DataTypes.DATE,
    total_pages: DataTypes.INTEGER,
    cover: {
        type: DataTypes.STRING,
        get(){
            const fileName = this.getDataValue('cover')
            return fileName ? '/uploads/bookCovers/' + fileName : null
        }
    },
    description: DataTypes.STRING
})

Book
    .addHook('afterDestroy', async (book, options) => {
        if(book.cover){
            const file = path.join('public', book.cover)
            fs.unlink(file, err => {
                if(err) console.error(err)
            })
        }
    })

module.exports = Book