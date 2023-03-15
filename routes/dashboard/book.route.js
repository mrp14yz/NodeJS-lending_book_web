const express = require('express')
const router = express.Router()
const { renderPageBook, addBook, getAllBook, getBookById, editBookById, deleteBookById } = require('../../controllers/dashboard/book.controller')
const upload = require('../../middlewares/multer.middleware')

router
    .route('/')
    .get(renderPageBook)
    .post(upload.single('cover'), addBook)

router
    .route('/fetch')
    .get(getAllBook)

router
    .route('/:id')
    .get(getBookById)
    .put(upload.single('cover'), editBookById)
    .delete(deleteBookById)

module.exports = router