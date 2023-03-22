const express = require('express')
const router = express.Router()
const { renderPageProfile, editProfile } = require('../../controllers/pages/user.controller')
const { checkAuthenticate } = require('../../middlewares/authenticate.middleware')

router.use(checkAuthenticate)
router
    .route('/')
    .get(renderPageProfile)
    .put(editProfile)

module.exports = router