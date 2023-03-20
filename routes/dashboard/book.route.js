const express = require('express')
const router = express.Router()
const { renderPageBook, addBook, getAllBook, getBookById, editBookById, deleteBookById } = require('../../controllers/dashboard/book.controller')
const upload = require('../../middlewares/multer.middleware')
const hasPermission = require('../../middlewares/authorize.middleware')

router
    .route('/')
    .get(hasPermission('view book'), renderPageBook)
    .post(hasPermission('add book'), upload.single('cover'), addBook)

router
    .route('/fetch')
    .get(getAllBook)

router
    .route('/:id')
    .get(getBookById)
    .put(hasPermission('edit book'), upload.single('cover'), editBookById)
    .delete(hasPermission('delete book'), deleteBookById)

module.exports = router