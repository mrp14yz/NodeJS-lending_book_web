const passport = require('../middlewares/passport.middleware')

const signIn = (req, res) => {
    passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureMessage: true
    })
}

const signOut = (req, res) => {
    req.session.destroy(function(err){
        res.redirect('/')
    })
}

module.exports = {
    signIn,
    signOut
}