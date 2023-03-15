const Permission = require('../../models/permission')
const Role = require('../../models/role')

const renderPageRole = async (req, res) => {
    const permission = await Permission.findAll()
    res.render('dashboard/account/role', {
        layout: 'layouts/layout2',
        permission: permission,
        active: 'role',
    })
}

const getAllRole = async (req, res) => {
    const roles = await Role.findAll({
        include: [
            { model: Permission }
        ]
    })

    res.json({
        data: roles
    })
}

const addRole = async (req, res) => {
    const role = await Role.create({
        name: req.body.name
    })
    
    let selected = req.body.permission
    if(Array.isArray(selected)){ 
        selected.forEach(async id => {
            const permission = await Permission.findByPk(id)
            await role.addPermission(permission)
        })
    }else{
        const permission = await Permission.findByPk(selected)
        await role.addPermission(permission)
    }
    
    res.json({
        status: 'Berhasil Menambahkan Role'
    })
}

const getRoleById = async (req, res) => {
    const role = await Role.findByPk(req.params.id, {
        include: {
            model: Permission
        }
    })
    res.json(role)
}

const editRoleById = async (req, res) => {
    const role = await Role.findByPk(req.params.id)
    await role.update({
        name: req.body.name
    })

    await role.setPermissions(null)
    let selected = req.body.permission
    if(Array.isArray(selected)){ 
        selected.forEach(async id => {
            const permission = await Permission.findByPk(id)
            await role.addPermission(permission)
        })
    }else{
        const permission = await Permission.findByPk(selected)
        await role.addPermission(permission)
    }

    res.json({
        status: 'Berhasil Mengubah Role'
    })
}

const deleteRoleById = async (req, res) => {
    await Role.destroy({
        where:{
            id: req.params.id
        }
    })

    res.json({
        status: 'Berhasil Menghapus Role'
    })
}

module.exports = {
    renderPageRole,
    getAllRole,
    addRole,
    getRoleById,
    editRoleById,
    deleteRoleById
}