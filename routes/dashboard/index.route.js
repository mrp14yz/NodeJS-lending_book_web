const express = require('express')
const router = express.Router()
const { renderPageDashboard } = require('../../controllers/dashboard/index.controller')
const { checkAuthenticate } = require('../../middlewares/authenticate.middleware')

router.use(checkAuthenticate)

router
    .route('/')
    .get(renderPageDashboard)

module.exports = router