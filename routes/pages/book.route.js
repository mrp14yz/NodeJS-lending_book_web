const express = require('express')
const router = express.Router()
const { renderPageBookBySlug } = require('../../controllers/pages/book.controller')

router
    .route('/:slug')
    .get(renderPageBookBySlug)

module.exports = router