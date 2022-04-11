const { DataTypes}  = require('sequelize')
const sequelize = require('../index')

const Movie = sequelize.define('Movie', {
    img: DataTypes.STRING,
    title: DataTypes.STRING,
    date_creation: DataTypes.DATE,
    rate: DataTypes.ENUM("1","2","3","4","5")
}, {
    timestamps: false
})

module.exports = Movie
