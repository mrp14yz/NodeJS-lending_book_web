const User = require('../../models/user')
const Role = require('../../models/role')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const renderPageUser = async (req, res) => {
    const roles = await Role.findAll()
    res.render('dashboard/account/user', {
        layout: 'layouts/layout2',
        roles: roles,
        active: 'user',
    })
}

const getAllUser = async (req, res) => {
    const users = await User.findAll({
        include:{
            model: Role
        }
    })

    res.json({
        data: users
    })
}

const addUser = async (req, res) => {
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
        if(req.body.role) {
            user.setRole(req.body.role)
        }

        res.json({
            status: 'Berhasil Menambahkan User'
        }) 
    } catch (err) {
        res.json({
            error: true,
            message: err.message
        })
    }
}

const getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: {
            model: Role
        }
    })
    
    res.json(user)
}

const editUserById = async (req, res) => {
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

        const user = await User.findByPk(req.params.id)
        if(user.email !== req.body.email){
            const checkEmail = await User.findAll()
            if(checkEmail) throw new Error('Email already been registed')
        }
        const oldPassword = await bcrypt.compare(req.body.password, user.password)
        if(!oldPassword){
            const salt = await bcrypt.genSalt()
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        await user.update(req.body)

        if(req.body.role) {
            user.setRole(req.body.role)
        }

        res.json({
            status: 'Berhasil Menambahkan User'
        }) 
    } catch (err) {
        res.json({
            error: true,
            message: err.message
        })
    }
}

const deleteUserById = async (req, res) => {
    await User.destroy({
        where:{
            id: req.params.id
        }
    })

    res.json({
        status: 'Berhasil Menghapus'
    })
}

module.exports = {
    renderPageUser,
    getAllUser,
    addUser,
    getUserById,
    editUserById,
    deleteUserById
}