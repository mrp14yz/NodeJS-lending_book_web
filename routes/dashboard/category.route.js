const express = require('express')
const router = express.Router()
const { renderPageCategory, addCategory, getAllCategory, getCategoryById, editCategoryById, deleteCategoryById } = require('../../controllers/dashboard/category.controller')

router
    .route('/')
    .get(renderPageCategory)
    .post(addCategory)

router
    .route('/fetch')
    .get(getAllCategory)

router
    .route('/:id')
    .get(getCategoryById)
    .put(editCategoryById)
    .delete(deleteCategoryById)

module.exports = router