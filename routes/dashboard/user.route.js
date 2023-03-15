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

router
    .route('/')
    .get(renderPageUser)
    .post(validateRegisterUser() ,addUser)
    
router
    .route('/fetch')
    .get(getAllUser)

router
    .route('/:id')
    .get(getUserById)
    .put(validateEditUser(), editUserById)
    .delete(deleteUserById)

module.exports = router