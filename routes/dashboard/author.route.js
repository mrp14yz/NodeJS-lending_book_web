const express = require('express')
const router = express.Router()
const { renderPageAuthor, addAuthor, getAllAuthor, getAuthorById, editAuthorById, deleteAuthorById } = require('../../controllers/dashboard/author.controller')

router
    .route('/')
    .get(renderPageAuthor)
    .post(addAuthor)

router
    .route('/fetch')
    .get(getAllAuthor)

router
    .route('/:id')
    .get(getAuthorById)
    .put(editAuthorById)
    .delete(deleteAuthorById)

module.exports = router