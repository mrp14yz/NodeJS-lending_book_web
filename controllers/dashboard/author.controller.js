const { Op } = require('sequelize')
const Author = require('../../models/author')
const slug = require('slug')

const renderPageAuthor = (req, res) => {
    res.render('dashboard/book/author', {
        layout: 'layouts/layout2',
        active: 'author',
    })
}

const getAllAuthor = async (req, res) => {
    const author = await Author.findAll()

    res.json({
        data: author
    })
}

const addAuthor = async (req, res) => {
    req.body.slug = await createSlug(req.body.name)
    try {    
        await Author.create(req.body)

        res.json({
            status: 'Berhasil Menambahkan Author'
        })   
    } catch (err) {
        res.json({
            error: true,
            message: err.message
        })
    }
}

const getAuthorById = async (req, res) => {
    const author = await Author.findByPk(req.params.id)

    res.json(author)
}

const editAuthorById = async (req, res) => {
    try {
        await Author.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        res.json({
            status: 'Berhasil Mengubah Author'
        })
    } catch (err) {
        res.json({
            error: true,
            message: err.message
        })
    }
}

const deleteAuthorById = async (req, res) => {
    await Author.destroy({
        where:{
            id: req.params.id
        }
    })

    res.json({
        status: 'Berhasil Menghapus Author'
    })
}

async function createSlug(name){
    let newSlug = slug(name)
    const { count } = await Author.findAndCountAll({
        where: {
            slug: {
                [Op.startsWith]: newSlug
            }
        }
    })
    if(count > 0) newSlug += `_${ count+1 }`
    return newSlug
}

module.exports = {
    renderPageAuthor,
    getAllAuthor,
    addAuthor,
    getAuthorById,
    editAuthorById,
    deleteAuthorById
}