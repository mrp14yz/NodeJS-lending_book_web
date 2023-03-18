const express = require('express')
const router = express.Router()
const { renderPageDashboard } = require('../../controllers/dashboard/index.controller')

router
    .route('/')
    .get(renderPageDashboard)

module.exports = router