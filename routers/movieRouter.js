const express = require('express')
const movieController = require('../controllers/movieController')
const movieValidation = require('../validations/movieValidation')
const validator = require('express-joi-validation').createValidator();

const routes = Movie => {
    const movieRouter = express.Router()

    const controller = movieController(Movie)
    const { getMovies, getMovieDetails, postMovie, deleteMovie, putMovie } = controller

    movieRouter
        .route('/movies')
        .get(getMovies)
        .post(validator.body(movieValidation), postMovie)

    movieRouter
        .route('/movie/:movieId')
        .get(getMovieDetails)
        .delete(deleteMovie)
        .put(validator.body(movieValidation), putMovie)

    return movieRouter 
}

module.exports = routes