const express = require('express')
const router = express.Router()
const { getAllAuthor, addAuthor, getAuthorBySlug, editAuthorById, deleteAuthorById } = require('../controllers/AuthorController')

router
    .route('/')
    .get(getAllAuthor)
    .post(addAuthor)

router
    .route('/:slug')
    .get(getAuthorBySlug)

router
    .route('/:id')
    .put(editAuthorById)
    .delete(deleteAuthorById)

module.exports = router