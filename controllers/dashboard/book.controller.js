const { Op } = require('sequelize')
const Book = require('../../models/book')
const Author = require('../../models/author')
const Category = require('../../models/category')
const fs = require('fs')
const path = require('path')
const slug = require('slug')
const uploadPath = path.join('public', 'uploads/bookCovers/')

const renderPageBook = async (req, res) => {
    const authors = await Author.findAll()
    const categories = await Category.findAll()
    res.render('dashboard/book/book', {
        layout: 'layouts/layout2',
        authors: authors,
        categories: categories,
        active: 'book',
    })
}

const getAllBook = async (req, res) => {
    const books = await Book.findAll({
        include: [
            { model: Author },
            { model: Category }
        ]
    })

    res.json({
        data: books
    })
}

const addBook = async (req, res) => {
    const data = req.body

    const fileName = req.file ? req.file.filename : null
    data.cover = fileName
    data.slug = await createBookSlug(data.title)

    try {
        const book = await Book.create(data)
        book.setAuthor(req.body.author)
        book.setCategory(req.body.category)

        res.json({
            status: 'Berhasil Menambahkan Buku'
        })
    } catch (err) {
        if(fileName) removeBookCover(fileName)
        res.send('error')
    }
}

const getBookById = async (req, res) => {
    const book = await Book.findByPk(req.params.id,{
        include:[
            { model: Author },
            { model: Category }
        ]
    })

    res.json(book)
}

const editBookById = async (req, res) => {
    const data = req.body
    const fileName = req.file ? req.file.filename : null
    data.cover = fileName
    data.slug = await createBookSlug(data.title)
    
    const book = await Book.findByPk(req.params.id)
    if(book._previousDataValues.cover) removeBookCover(book._previousDataValues.cover)
    await book.update(data)
    book.setAuthor(req.body.author)
    book.setCategory(req.body.category)

    res.json({
        status: 'Berhasil Mengubah Buku'
    })
}

const deleteBookById = async (req, res) => {
    await Book.destroy({
        where: {
            id: req.params.id
        },
        individualHooks: true
    })

    res.json({
        status: 'Berhasil Menghapus Buku'
    })
}

async function createBookSlug(title){
    let newSlug = slug(title)
    const { count } = await Book.findAndCountAll({
        where: {
            slug: {
                [Op.startsWith]: newSlug
            }
        }
    })
    if(count > 0){
        newSlug += `_${count}`
    }
    return newSlug
}

function removeBookCover(fileName){
    if(!uploadPath.includes(fileName))
        fileName = uploadPath + fileName

    fs.unlink(fileName, err => {
        if(err) console.error(err)
    })
}

// use this when you want to save image as Buffer in server
/*
function saveCover(book, coverEncoded){
    if (coverEncoded == null) return 
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)){
        book.coverImage = new Buffer.from(cover.data, 'base64')
        book.coverImageType = cover.type
    }
}
*/

module.exports = {
    renderPageBook,
    getAllBook,
    addBook,
    getBookById,
    editBookById,
    deleteBookById,
}