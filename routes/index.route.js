const express = require('express')
const router = express.Router()
const { renderPageHome } = require('../controllers/index.controller')

router
    .route('/')
    .get(renderPageHome)

module.exports = router
