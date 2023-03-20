const express = require('express')
const router = express.Router()
const { renderPageAuthor, addAuthor, getAllAuthor, getAuthorById, editAuthorById, deleteAuthorById } = require('../../controllers/dashboard/author.controller')
const hasPermission = require('../../middlewares/authorize.middleware')

router
    .route('/')
    .get(hasPermission('view author'), renderPageAuthor)
    .post(hasPermission('add author'), addAuthor)

router
    .route('/fetch')
    .get(getAllAuthor)

router
    .route('/:id')
    .get(getAuthorById)
    .put(hasPermission('edit author'), editAuthorById)
    .delete(hasPermission('delete author'), deleteAuthorById)

module.exports = router