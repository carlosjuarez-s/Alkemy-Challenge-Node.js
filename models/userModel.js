const { DataTypes } = require('sequelize')
const sequelize = require('../index')

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
}, { timestamps: false })

module.exports = User