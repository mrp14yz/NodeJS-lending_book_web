const express = require('express')
const router = express.Router()
const { 
    renderPageUser, 
    addUser, 
    getUserById, 
    editUserById, 
    deleteUserById, 
    getAllUser 
} = require('../../controllers/dashboard/user.controller')
const { validateRegisterUser, validateEditUser } = require('../../middlewares/validator.middleware')
const hasPermission = require('../../middlewares/authorize.middleware')

router
    .route('/')
    .get(hasPermission('view user'), renderPageUser)
    .post(hasPermission('add user'), validateRegisterUser() ,addUser)
    
router
    .route('/fetch')
    .get(getAllUser)

router
    .route('/:id')
    .get(getUserById)
    .put(hasPermission('edit user'), validateEditUser(), editUserById)
    .delete(hasPermission('delete user'), deleteUserById)

module.exports = router