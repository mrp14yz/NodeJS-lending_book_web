const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db.config')
const User = require('./user')
const Permission = require('./permission')
const Role_Permission = require('./role_permission')

const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
})

Role.hasMany(User)
User.belongsTo(Role)

Role.belongsToMany(Permission, {
    through: Role_Permission,
})
Permission.belongsToMany(Role, {
    through: Role_Permission,
})

module.exports = Role