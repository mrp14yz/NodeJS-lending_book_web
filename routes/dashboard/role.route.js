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

router
    .route('/')
    .get(renderPageRole)
    .post(addRole)

router
    .route('/fetch')
    .get(getAllRole)

router
    .route('/:id')
    .get(getRoleById)
    .put(editRoleById)
    .delete(deleteRoleById)

module.exports = router