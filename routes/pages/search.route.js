const express = require('express')
const router = express.Router()
const { renderPageResultSearch } = require('../../controllers/pages/search.controller')

router
    .route('/')
    .get(renderPageResultSearch)

module.exports = router