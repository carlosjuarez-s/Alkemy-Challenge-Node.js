const express = require('express')
const movieController = require('../controllers/movieController')

const routes = Movie => {
    const movieRouter = express.Router()

    const controller = movieController(Movie)
    const { getMovies } = controller

    movieRouter
        .route('/movies')
        .get(getMovies)


    return movieRouter 
}

module.exports = routes