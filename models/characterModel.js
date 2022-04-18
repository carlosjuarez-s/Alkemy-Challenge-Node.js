const { DataTypes } = require('sequelize')
const sequelize = require('../index')

const Character = sequelize.define('Character', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    img: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    history: DataTypes.STRING
}, {
    tableName: 'characters',
    timestamps: false
})

module.exports = Character;