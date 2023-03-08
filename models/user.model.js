const { DataTypes } = require('sequelize')
const sequelize = require('./db.config')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hashPassword: {
        type: DataTypes.STRING(64),
        allowNull: false,
        set(value){
            this.setDataValue('password', hash(value))
        }
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    roles: {
        type: DataTypes.ENUM,
        values: ['admin', 'librarian', 'patron'],
        defaultValue: 'patron'
    }
})

User
    .sync()
    .then(() => {
        console.log('Table user created successfully')
    })
    .catch((err) => {
        console.error('Unable to create table', err)
    })

module.exports = User