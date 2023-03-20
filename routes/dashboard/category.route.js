const express = require('express')
const router = express.Router()
const { renderPageCategory, addCategory, getAllCategory, getCategoryById, editCategoryById, deleteCategoryById } = require('../../controllers/dashboard/category.controller')
const hasPermission = require('../../middlewares/authorize.middleware')

router
    .route('/')
    .get(hasPermission('view category'), renderPageCategory)
    .post(hasPermission('add category'), addCategory)

router
    .route('/fetch')
    .get(getAllCategory)

router
    .route('/:id')
    .get(getCategoryById)
    .put(hasPermission('edit category'), editCategoryById)
    .delete(hasPermission('delete category'), deleteCategoryById)

module.exports = router