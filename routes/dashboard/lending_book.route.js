const express = require('express')
const router = express.Router()
const { renderPageLendingBook, getAllLendingBook, editStatusLendingBook } = require('../../controllers/dashboard/lending_book.controller')

router
    .route('/')
    .get(renderPageLendingBook)

router
    .route('/fetch')
    .get(getAllLendingBook)

router
    .route('/:id')
    .put(editStatusLendingBook)

module.exports = router