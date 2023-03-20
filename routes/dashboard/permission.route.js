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
const hasPermission = require('../../middlewares/authorize.middleware')

router
    .route('/')
    .get(hasPermission('view permission'), renderPagePermission)
    .post(hasPermission('add permission'), addPermission)

router
    .route('/fetch')
    .get(getAllPermission)

router
    .route('/:id')
    .get(getPermissionById)
    .put(hasPermission('edit permission'), editPermissionById)
    .delete(hasPermission('delete permission'), deletePermissionById)

module.exports = router