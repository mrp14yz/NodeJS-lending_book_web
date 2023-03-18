const Category = require('../../models/category')
const Book = require('../../models/book')
const Author = require('../../models/author')

const renderPageCategoryBySlug = async (req, res) => {
    let page = req.query.page ? req.query.page : 1
    const slug = req.params.slug
    
    const { count, rows } = await Book.findAndCountAll({
        attributes: ['slug', 'title', 'cover', 'description'],
        include: [
            { model: Author, attributes: ['slug', 'name'] },
            { model: Category, attributes: ['slug', 'name'], where: { slug: slug }}
        ],
        order: [
            ['createdAt', 'DESC']
        ],
        limit:1,
        offset: (page-1)*10
    })

   res.render('pages/category', {
       books: rows,
       currentPage: page,
       totalPage: Math.ceil(count/10),
       url:  `/category/${slug}/?page=`
   })
}

const getAllCategory = async (req, res) => {
    const categories = await Category.findAll({
        attributes: ['slug', 'name']
    })
    res.json(categories)
}

module.exports = {
    renderPageCategoryBySlug,
    getAllCategory
}