const { DataTypes } = require('sequelize')
const sequelize = require('../index')
const Character = require('./characterModel')
const Movie = require('./movieModel')


const CharacterMovie = sequelize.define('CharacterMovie', {
    CharacterId: {
        type: DataTypes.INTEGER,
        references: {
            model: Character,
            key: 'id'
        }
    },
    MovieId: {
        type: DataTypes.INTEGER,
        references: {
            model: Movie,
            key: 'id'
        }
    }
}, {
    tableName: 'character_movie',
    timestamps: false
})

function associationModels() {
    Movie.belongsToMany(Character, {through: CharacterMovie})
    Character.belongsToMany(Movie, {through: CharacterMovie})
}

Movie.belongsToMany(Character, {through: CharacterMovie})
Character.belongsToMany(Movie, {through: CharacterMovie})

module.exports = {CharacterMovie, associationModels}