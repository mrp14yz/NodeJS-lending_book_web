const express = require('express')
const router = express.Router()
const { renderPageAuthorBySlug } = require('../../controllers/pages/author.controller')

router
    .route('/:slug')
    .get(renderPageAuthorBySlug)

module.exports = router