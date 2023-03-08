const express = require('express')
const router = express.Router()
const { getAllBook, addBook, deleteBookById } = require('../controllers/BookController')
const { checkAuthenticate } = require('../controllers/AuthController')
const upload = require('../middlewares/multer.middleware')

router
    .route('/')
    .get(getAllBook)
    .post(upload.single('cover'), addBook)

router
    .route('/:slug')
    .get()

router
    .route('/:id')
    .put(checkAuthenticate)
    .delete(deleteBookById)

module.exports = router