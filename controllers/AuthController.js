const logoutHandler = (req, res) => {
    req.session.destroy(function(err){
        res.redirect('/')
    })
}

const checkAuthenticate = (req, res, next) => {
    if(req.isAuthenticated()) return next()
    res.redirect('/login')
}

const checkNotAuthenticate = (req, res, next) => {
    if(req.isAuthenticated()) return res.redirect('/')
    next()
}

const hasAuthorization = (req, res, next) => {
    if(req.user.role == 'patron') return res.redirect('/')
    next()
}

module.exports = {
    logoutHandler,
    checkAuthenticate,
    checkNotAuthenticate,
    hasAuthorization
}