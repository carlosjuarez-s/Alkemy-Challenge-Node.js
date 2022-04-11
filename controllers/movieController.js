const movieController = Movie => {
    const getMovies = async(req, res) => {
        const movies = await Movie.findAll()

        res.json(movies)
    }

    return { getMovies }
}

module.exports = movieController