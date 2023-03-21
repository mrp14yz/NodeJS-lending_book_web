const { body } = require('express-validator')
const User = require('../models/user')

function validateRegisterUser(){
    return [
        body('name')
            .notEmpty()
            .withMessage('Name should not empty')
            .trim(),
        body('email')
            .notEmpty()
            .withMessage('Email should not empty')
            .isEmail()
            .normalizeEmail()
            .custom(async email => {
                return await User.findOne({
                    where: {
                        email: email
                    }
                }).then(user => {
                    if(user) return Promise.reject('Email already been registed')
                })
            }),
        body('password')
            .notEmpty()
            .withMessage('Password should not empty')
            .isLength({min: 5})
            .withMessage('Password length should not less than 5')
            .matches(/\d/)
            .withMessage('Password should have atleast a number')
    ]
}

function validateEditUser(){
    return [
        body('name')
            .notEmpty()
            .withMessage('Name should not empty')
            .trim(),
        body('email')
            .notEmpty()
            .withMessage('Email should not empty')
            .isEmail()
            .normalizeEmail(),
        body('password')
            .notEmpty()
            .withMessage('Password should not empty')
            .isLength({min: 5})
            .withMessage('Password length should not less than 5')
            .matches(/\d/)
            .withMessage('Password should have atleast a number')
    ]
}

module.exports = {
    validateRegisterUser,
    validateEditUser
}