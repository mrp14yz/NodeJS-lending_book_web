const Category = require('../../models/category')
const slug = require('slug')

const renderPageCategory = (req, res) => {
    res.render('dashboard/book/category', {
        layout: 'layouts/layout2',
        active: 'category',
    })
}

const getAllCategory = async (req, res) => {
    const categories = await Category.findAll()

    res.json({
        data: categories
    })
}

const addCategory = async (req, res) => {
    req.body.slug = slug(req.body.name)
    await Category.create(req.body)

    res.json({
        status: 'Berhasil Menambahkan Category'
    })
}

const getCategoryById = async (req, res) => {
    const category = await Category.findByPk(req.params.id)

    res.json(category)
}

const editCategoryById = async (req, res) => {
    req.body.slug = slug(req.body.name)
    await Category.update(req.body, {
        where:{
            id: req.params.id
        }
    })

    res.json({
        status: 'Berhasil Mengubah Category'
    })
}

const deleteCategoryById = async (req, res) => {
    await Category.destroy({
        where:{
            id: req.params.id
        }
    })

    res.json({
        status: 'Berhasil Menghapus Category'
    })
}

module.exports = {
    renderPageCategory,
    getAllCategory,
    addCategory,
    getCategoryById,
    editCategoryById,
    deleteCategoryById
}