const { Op } = require('sequelize')
const Book = require('../models/book')
const Author = require('../models/author')
const Category = require('../models/category')

const searchAll = async (req, res) =>{
    // search title, author, desc, isbn
}

const searchByTitle = async (req, res) =>{
    const books = await Book.findAll({
        where:{
            title:{
                [Op.substring]: req.query.search
            }
        }
    })

    res.render('search', {
        book: books
    })
}

const searchByAuthor = async (req, res) =>{
//    const books = await 

    res.render('search', {
        book: books
    })
}

const filterSearch = async (req, res) =>{
    const book = await Book.findAll()
    
    if(req.body.category){
        book.findAll({
            include:[
                {
                    model: Category,
                    where:{
                        id: req.body.category
                    }
                }
            ]
        })
    }

    if(req.body.dateBefore){
        book.findAll({
            where:{
                publish:{
                    [Op.lte]:req.body.dateBefore
                }
            }
        })
    }

    if(req.body.dateAfter){
        book.findAll({
            where:{
                publish:{
                    [Op.gte]: req.body.dateAfter
                }
            }
        })
    }
}

module.exports = {}