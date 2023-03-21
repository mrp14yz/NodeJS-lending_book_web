const User = require('../models/user')
const Role = require('../models/role')
const Permission = require('../models/permission')

module.exports = function(permission) {
    return async function (req, res, next) {
        const user = await User.findByPk(req.user.id,{
            attributes: ['id'],
            include: {
                model: Role,
                attributes: ['id'],
                include: [
                    { model: Permission, attributes: ['name'] }
                ]
            }
        })

        const userPermission = (user.role.permissions).map(permission => permission.name)
        if(userPermission.includes(permission)) return next()
        if(permission == 'access dashboard') return res.redirect('/')
        res.redirect('/dashboard')
    }
}