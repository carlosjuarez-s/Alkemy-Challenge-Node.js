const { DataTypes } = require('sequelize')
const sequelize = require('../index')
const Movie = require('../models/movieModel')
const Genre = require('../models/genreModel')

const movieGenre = sequelize.define('MovieGenre', {
    MovieId: {
        type: DataTypes.INTEGER,
        references: {
            model: Movie,
            key: 'id'
        }
    },
    GenreId: {
        type: DataTypes.INTEGER,
        references: {
            model: Genre,
            key: 'id'
        }
    }
}, {
    tableName: 'movie_genre',
    timestamps: false
})

function associationModels() {
    Movie.belongsToMany(Genre, {through: movieGenre})
    Genre.belongsToMany(Movie, {through: movieGenre})
}

Movie.belongsToMany(Genre, {through: movieGenre})
Genre.belongsToMany(Movie, {through: movieGenre})

module.exports = movieGenre
