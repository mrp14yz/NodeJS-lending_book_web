const express = require('express')
const router = express.Router()
const { 
    renderPagePermission, 
    getAllPermission, 
    addPermission, 
    editPermissionById, 
    deletePermissionById, 
    getPermissionById
} = require('../../controllers/dashboard/permission.controller')

router
    .route('/')
    .get(renderPagePermission)
    .post(addPermission)

router
    .route('/fetch')
    .get(getAllPermission)

router
    .route('/:id')
    .get(getPermissionById)
    .put(editPermissionById)
    .delete(deletePermissionById)

module.exports = router