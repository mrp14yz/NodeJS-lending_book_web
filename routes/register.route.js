const express = require('express')
const router = express.Router()
const { renderPageRegister, signUp } = require('../controllers/register.controller')
const { validateRegisterUser } = require('../middlewares/validator.middleware')
const { checkNotAuthenticate } = require('../middlewares/authenticate.middleware')


router
    .route('/')
    .get(checkNotAuthenticate, renderPageRegister)
    .post(validateRegisterUser(), signUp)

module.exports = router