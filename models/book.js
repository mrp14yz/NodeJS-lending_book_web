const { DataTypes, Op } = require('sequelize')
const sequelize = require('../configs/db.config')
const path = require('path')
const fs = require('fs')
const slug = require('slug')

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
    .addHook('afterUpdate', async (book, options) => {
        if(book.dataValues.title !== book._previousDataValues.title){
            let newSlug = slug(book.title)
            const { count } = await Book.findAndCountAll({
                where: {
                    slug: {
                        [Op.startsWith]: newSlug
                    },
                    [ Op.not ]: {
                        id: book.id
                    }
                }
            })
            if(count > 0) newSlug += `_${ count+1 }`
            book.setDataValue('slug', newSlug)
        }
    })

module.exports = Book