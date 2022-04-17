const Character = require('../models/characterModel')
const Genre = require('../models/genreModel')

const movieController = Movie => {
    const getMovies = async(req, res) => {
        const { query } = req
        let response

        if(Object.keys(query).length > 0) {
            if(query.title) response = await Movie.findOne({ where: {title: query.title}})
            if(query.genre) response = await Movie.findAll({
                include: [{
                    model: Genre,
                    where: {
                        id: query.genre
                    }
                }]
            })
            if(query.order === 'ASC') response = await Movie.findAll( {order: [['date_creation', 'ASC']]})
            if(query.order === 'DESC') response = await Movie.findAll( {order: [['date_creation', 'DESC']]})
        } else {
            response = await Movie.findAll({
                attributes: ['img', 'title', 'date_creation']
            })
        }

        res.json(response)
    }

    const getMovieDetails = async(req, res) => {
        const { params } = req
        const movie = await Movie.findOne({
            where: {
                id: params.movieId
            },
            include: Character
        })

        res.json(movie)
    }

    const postMovie = async(req, res) => {
        const { body } = req
        const movie = Movie.build(body)
        
        await movie.save()
        res.json("Movie created")
    }

    const deleteMovie = async(req, res) => {
        const { params } = req
        await Movie.destroy({
            where: {
                id: params.movieId
            }
        })

        res.json("Movie deleted")
    }

    const putMovie = async(req, res) => {
        const { body, params } = req

        await Movie.update(
            {
                img: body.img,
                title: body.title,
                date_creation: body.date_creation,
                rate: body.rate
            },
            {
                where: {
                    id: params.movieId
                }
            }
        )

        res.json("Movie update")
    }

    return { getMovies, getMovieDetails, postMovie, deleteMovie, putMovie }
}

module.exports = movieController