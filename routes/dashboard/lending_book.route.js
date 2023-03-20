const express = require('express')
const router = express.Router()
const { renderPageLendingBook, getAllLendingBook, editStatusLendingBook } = require('../../controllers/dashboard/lending_book.controller')
const hasPermission = require('../../middlewares/authorize.middleware')

router
    .route('/')
    .get(hasPermission('view lending book'), renderPageLendingBook)

router
    .route('/fetch')
    .get(getAllLendingBook)

router
    .route('/:id')
    .put(hasPermission('change status lending'), editStatusLendingBook)

module.exports = router