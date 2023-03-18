const { DataTypes, Op } = require('sequelize')
const sequelize = require('../configs/db.config')
const Book = require('./book')
const slug = require('slug')

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
        type: DataTypes.STRING,
        unique: true
    }
})

Author
    .addHook('afterUpdate', async (author, options) => {
        if(author.dataValues.name !== author._previousDataValues.name){
            let newSlug = slug(author.name)
            const { count } = await Author.findAndCountAll({
                where: {
                    slug: {
                        [Op.startsWith]: newSlug
                    },
                    [ Op.not ]: {
                        id: author.id
                    }
                }
            })
            if(count > 0) newSlug += `_${ count+1 }`
            author.setDataValue('slug', newSlug)
        }
    })

Author.hasMany(Book, { onDelete: 'CASCADE' })
Book.belongsTo(Author)

module.exports = Author