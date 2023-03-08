const Book = require('../models/book')
const Author = require('../models/author')
const Category = require('../models/category')
const fs = require('fs')
const path = require('path')

const getAllBook = async (req, res) => {
    const books = await Book.findAll({
        include: [Author, Category]
    })
    const category = await Category.findAll()
    const author = await Author.findAll()
    res.render('book', {
        book: books,
        category: category,
        author: author
    })
}

const addBook = async (req, res) => {
    const fileName = req.file ? req.file.filename : null
    const data = req.body
    data.authorId = data.author
    data.categoryId = data.category
    data.cover = fileName
    try { 
        await Book.create(data)
        res.redirect('/book')
    } catch (err) {
        if(fileName) removeBookCover(fileName)
        res.redirect('/book')
    }
}

const getBookBySlug = async (req, res) => {
    const books = await Book.findOne({
        where:{
            slug: req.params.slug
        },
        include: [Author, Category]
    })
    res.send(books)
}

const editBookById = async (req, res) => {
    const fileName = req.file ? req.file.filename : null
    const data = req.body
    data.authorId = data.author
    data.categoryId = data.category
    data.cover = fileName
    try {    
        await Book.update( data, {
            where:{
                id: req.params.id
            }
        })
        res.redirect('/book')
    } catch (err) {
        res.render('book', {
            book: req.body
        })
    }
}

const deleteBookById = async (req, res) => {
    try {
        const books = await Book.findOne({
            where:{
                id: req.params.id
            }
        })
        if(books.cover) removeBookCover(books.cover)

        await Book.destroy({
            where:{
                id: req.params.id
            }
        })
        res.redirect('/book')
    } catch (err) {
        res.render('index', {
            errorMessage: err.message
        })
    }
}

function removeBookCover(fileName){
    const uploadPath = path.join('public', 'uploads/bookCovers/')
    if(!uploadPath.includes(fileName))
        fileName = uploadPath+fileName
    fs.unlink(fileName, err => {
        if(err) console.error(err)
    })
}

module.exports = {
    getAllBook,
    addBook,
    getBookBySlug,
    editBookById,
    deleteBookById
}