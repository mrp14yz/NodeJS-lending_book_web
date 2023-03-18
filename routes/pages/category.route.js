const express = require('express')
const router = express.Router()
const { getAllCategory, renderPageCategoryBySlug } = require('../../controllers/pages/category.controller')

router
    .route('/fetch')
    .get(getAllCategory)

router
    .route('/:slug')
    .get(renderPageCategoryBySlug)

module.exports = router