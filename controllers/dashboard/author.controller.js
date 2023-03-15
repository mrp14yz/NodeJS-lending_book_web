const Author = require('../../models/author')

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
    await Author.create(req.body)

    res.json({
        status: 'Berhasil Menambahkan Author'
    })
}

const getAuthorById = async (req, res) => {
    const author = await Author.findByPk(req.params.id)

    res.json(author)
}

const editAuthorById = async (req, res) => {
    await Author.update(req.body, {
        where: {
            id: req.params.id
        }
    })

    res.json({
        status: 'Berhasil Mengubah Author'
    })
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

module.exports = {
    renderPageAuthor,
    getAllAuthor,
    addAuthor,
    getAuthorById,
    editAuthorById,
    deleteAuthorById
}