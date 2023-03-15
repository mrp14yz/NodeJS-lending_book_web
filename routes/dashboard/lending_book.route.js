const express = require('express')
const router = express.Router()

router
    .route('/')
    .get()

router
    .route('/fetch')
    .get()

router
    .route('/:id')
    .put()

module.exports = router