const { DataTypes } = require('sequelize')
const sequelize = require('../index')

const Genre = sequelize.define('Genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    img: DataTypes.STRING,
    name: DataTypes.STRING,
}, { timestamps: false })

module.exports = Genre