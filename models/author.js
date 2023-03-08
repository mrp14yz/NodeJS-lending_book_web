const { DataTypes, Op } = require('sequelize')
const sequelize = require('../configs/db.config')
const slug = require('slug')
const Book = require('./book')

const Author = sequelize.define('author', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING
    }
})

const updateSlug = async (author, options) =>{
    let newSlug = slug(author.name, { remove: /[0-9]/g })
        const { count } = await Author.findAndCountAll({
            where:{
                slug: {
                    [Op.startsWith]: newSlug
                }
            }
        })
        if(count > 0){
            newSlug += `_${count}`
        }
        author.setDataValue('slug', newSlug)
}

Author
    .addHook('beforeCreate', updateSlug)
    .addHook('afterUpdate', updateSlug)

Author.hasMany(Book, { onDelete: 'CASCADE' })
Book.belongsTo(Author)

module.exports = Author