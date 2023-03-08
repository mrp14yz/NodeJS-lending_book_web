const { DataTypes, Op, Model } = require('sequelize')
const sequelize = require('../configs/db.config')
const slug = require('slug')
const path = require('path')

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
            const bookCoverPath = path.join('public', 'uploads/bookCovers/')
            return fileName ? bookCoverPath + fileName : null
        }
    },
    description: DataTypes.TEXT
})

const updateSlug = async (book, options) =>{
    let newSlug = slug(book.title)
    const { count } = await Book.findAndCountAll({
        where:{
            slug: {
                [Op.startsWith]: newSlug
            }
        }
    })
    if(count > 0){
        newSlug += `_${count}`
    }
    book.setDataValue('slug', newSlug)
}

Book
    .addHook('beforeCreate', updateSlug)
    .addHook('afterUpdate', updateSlug)

module.exports = Book