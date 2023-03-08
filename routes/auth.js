const express = require('express')
const passport = require('../middlewares/passport.middleware')
const router = express.Router()
const { checkNotAuthenticate, logoutHandler }= require('../controllers/AuthController')

router
    .route('/login')
    .get(checkNotAuthenticate, (req, res) => {
        res.render('login')
    })
    .post(passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureMessage: true
    }))

router
    .route('/logout')
    .delete(logoutHandler)

module.exports = router