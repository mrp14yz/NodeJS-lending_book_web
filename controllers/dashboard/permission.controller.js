const Permission = require('../../models/permission')

const renderPagePermission = async (req, res) => {
    res.render('dashboard/account/permission', {
        layout: 'layouts/layout2',
        active: 'permission',
    })
}

const getAllPermission = async (req, res) => {
    const permission = await Permission.findAll()
    res.json({
        data: permission
    })
}

const addPermission = async (req, res) => {
    await Permission.create(req.body)
    res.json({
        status: 'Berhasil Menambahkan Permission'
    })
}

const getPermissionById = async (req, res) => {
    const permission = await Permission.findByPk(req.params.id)

    res.json(permission)
}

const editPermissionById = async (req, res) => {
    await Permission.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    res.json({
        status: 'Berhasil Mengupdate Permission'
    })
}

const deletePermissionById = async (req, res) => {
    await Permission.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({
        status: 'Berhasil Mendelete Permission'
    })
}

module.exports = {
    renderPagePermission,
    getAllPermission,
    addPermission,
    getPermissionById,
    editPermissionById,
    deletePermissionById
}