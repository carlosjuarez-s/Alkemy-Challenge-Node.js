const express = require('express')
const movieController = require('../controllers/movieController')

const routes = Movie => {
    const movieRouter = express.Router()

    const controller = movieController(Movie)
    const { getMovies, getMovieDetails, postMovie, deleteMovie, putMovie } = controller

    movieRouter
        .route('/movies')
        .get(getMovies)
        .post(postMovie)

    movieRouter
        .route('/movie/:movieId')
        .get(getMovieDetails)
        .delete(deleteMovie)
        .put(putMovie)

    return movieRouter 
}

module.exports = routes