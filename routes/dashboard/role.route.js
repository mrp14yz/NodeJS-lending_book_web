const express = require('express')
const router = express.Router()
const { 
    renderPageRole, 
    addRole, 
    editRoleById, 
    deleteRoleById, 
    getAllRole, 
    getRoleById
} = require('../../controllers/dashboard/role.controller')
const hasPermission = require('../../middlewares/authorize.middleware')

router
    .route('/')
    .get(hasPermission('view role'), renderPageRole)
    .post(hasPermission('add role'), addRole)

router
    .route('/fetch')
    .get(getAllRole)

router
    .route('/:id')
    .get(getRoleById)
    .put(hasPermission('edit role'), editRoleById)
    .delete(hasPermission('delete role'), deleteRoleById)

module.exports = router