const User = require('../models/user')
const Role = require('../models/role')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const renderPageRegister = (req, res) => {
    res.render('register')
}

const signUp = async (req, res) => {
    try {
        const hasError = validationResult(req).mapped()
        if(hasError){
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

        const salt = await bcrypt.genSalt()
        req.body.password = await bcrypt.hash(req.body.password, salt)
        
        const user = await User.create(req.body)
        const [role, created] = await Role.findOrCreate({
            where: { name: 'patron' },
            defaults: { name: 'patron' }
        })

        if(created) user.setRole(created.id)
        else user.setRole(role.id)

        res.redirect('/login')
    } catch (err) {
        res.render('register', {
            name: req.body.name,
            email: req.body.email,
            errorMessage: err.message
        })
    }
}

module.exports = {
    renderPageRegister,
    signUp
}