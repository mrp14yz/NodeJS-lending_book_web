const express = require('express')
const router = express.Router()
const { renderPageLogin, signIn, signOut } = require('../controllers/auth.controller')
const { checkNotAuthenticate } = require('../middlewares/authenticate.middleware')

router
    .route('/login')
    .get(checkNotAuthenticate, renderPageLogin)
    .post(signIn)

router
    .route('/logout')
    .delete(signOut)

module.exports = router