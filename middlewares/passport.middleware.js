const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

const authenticateUser = async (req, email, password, done) => {
    await User.findOne({
        where: {
            email: email
        }
    }).then(async function(user){
        if(user === null) return done(null, false, req.flash('error', 'There no user'))
        if(await bcrypt.compare(password, user.password)){
            return done(null, user, req.flash('success', 'Login successfully'))
        }else
            return done(null, false, req.flash('error', 'Email/Username incorrect'))
    })
}

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, authenticateUser ))

passport.serializeUser(function(user, done){
    return done(null, user.id)
})

passport.deserializeUser(function(id, done){
    User
        .findByPk(id)
        .then(function(user){
            if(user) return done(null, user.get())
            else done(user.errors, null)
        })
})

module.exports = passport