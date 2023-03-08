const User = require('../models/user')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const registerHandler = (async (req, res) => {
    try {
        const hasError = validationResult(req).mapped()
        if(hasError !== null){
            if(typeof hasError.name !== 'undefined'){
                throw new Error(hasError.name.msg)
            }
            if(typeof hasError.password !== 'undefined'){
                throw new Error(hasError.password.msg)
            }
            if(typeof hasError.email !== 'undefined'){
                throw new Error(hasError.email.msg)
            }
        }

        const { count } = await User.findAndCountAll({
            where: {
                email: req.body.email
            }
        })
        if(count) throw new Error('Email already been registed')
    
        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(req.body.password, salt)
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: password
        }
        await User.create(data)
        res.redirect('/login')
    } catch (err) {
        res.render('register', {
            name: req.body.name,
            email: req.body.email,
            errorMessage: err.message
        })
    }
})



module.exports = {
    registerHandler
}