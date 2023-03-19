const passport = require('../middlewares/passport.middleware')

const renderPageLogin = (req, res) => {
    res.render('login')
}

const signIn = passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
})

const signOut = (req, res) => {
    req.session.destroy(function(err){
        res.redirect('/')
    })
}

module.exports = {
    renderPageLogin,
    signIn,
    signOut
}