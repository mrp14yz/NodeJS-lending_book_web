const Author = require('../models/author')
const Book = require('../models/book')

const getAllAuthor = async (req, res) => {
    const author = await Author.findAll()
    res.render('author', {
        author: author
    })
}

const addAuthor = async (req, res) => {
    await Author.create(req.body)
    res.redirect('/author')
}

const getAuthorBySlug = async (req, res) => {
    const author = await Author.findOne({
        where:{
            slug: req.params.slug
        },
        include: Book
    })

    res.render(`/author/${req.params.slug}`, {
        author: author
    })
}

const editAuthorById = async (req, res) => {
    await Author.update(req.body, {
        where:{
            id: req.params.id
        }
    })
    
    res.redirect('/author')
}

const deleteAuthorById = async (req, res) => {
    await Author.destroy({
        where:{
            id: req.params.id
        }
    })
    res.redirect('/author')
}

module.exports = {
    getAllAuthor,
    addAuthor,
    getAuthorBySlug,
    editAuthorById,
    deleteAuthorById
}