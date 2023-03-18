const Author = require('../../models/author')
const Book = require('../../models/book')

const renderPageAuthorBySlug = async (req, res) => {
    const author = await Author.findOne({
        attributes: ['name'],
        where: {
            slug: req.params.slug
        },
        include: {
            model: Book,
            attributes: ['title', 'slug', 'cover']
        }
    })

    res.render('pages/author', {
        author: author
    })
}

module.exports = {
    renderPageAuthorBySlug
}