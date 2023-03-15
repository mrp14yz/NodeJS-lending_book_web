const express = require('express')
const router = express.Router()
const passport = require('../middlewares/passport.middleware')
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