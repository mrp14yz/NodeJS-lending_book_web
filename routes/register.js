const express = require('express')
const router = express.Router()
const { checkNotAuthenticate } = require('../controllers/AuthController')
const { registerHandler } = require('../controllers/RegisterController')
//const { registerFormValidation } = require('../middlewares/validator.middleware')

router
    .route('/')
    .get(checkNotAuthenticate, (req, res) => {
        res.render('register')
    })
    .post(registerHandler)

module.exports = router