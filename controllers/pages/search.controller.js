const Category = require('../../models/category')
const Book = require('../../models/book')
const Author = require('../../models/author')
const { Op } = require('sequelize')

const renderPageResultSearch = async(req, res) => {
    let page = req.query.page ? req.query.page : 1
    let searchInput = req.query.search
    const limit = 10
    
    const { count, rows } = await Book.findAndCountAll({
        where: {
            [Op.or]: [
                { title: { [Op.substring]: searchInput } },
                { description: { [Op.substring]: searchInput } },
                { '$author.name$': { [Op.substring]: searchInput } },
                { '$category.name$': { [Op.substring]: searchInput } },
            ]
        },
        attributes: ['slug', 'title', 'cover', 'description'],
        include: [
            { model: Author, attributes: ['slug', 'name'] },
            { model: Category, attributes: ['slug', 'name']}
        ],
        order: [
            ['createdAt', 'DESC']
        ],
        limit: limit,
        offset: (page-1)*limit
    })
    
    res.render('pages/search', {
        books: rows,
        currentPage: page,
        totalPage: Math.ceil(count/limit),
        url:  `/search/search=${ searchInput }&page=`
    })
}

module.exports = {
    renderPageResultSearch
}