const express = require('express')
const router = express.Router()
const { renderPageDashboard } = require('../../controllers/dashboard/index.controller')
const { checkAuthenticate } = require('../../middlewares/authenticate.middleware')
const hasPermission = require('../../middlewares/authorize.middleware')

router.use(checkAuthenticate)
router.use(hasPermission('access dashboard'))

router
    .route('/')
    .get(renderPageDashboard)

module.exports = router