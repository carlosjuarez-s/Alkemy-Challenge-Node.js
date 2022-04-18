const Movie = require('../models/movieModel')


const characterController = Character =>{

    const getCharacters = async(req, res) => {
        const { query } = req
        let response
        
        if(Object.keys(query).length > 0) {
            if(query.age) response = await Character.findOne({where: {age: query.age}})
            if(query.name) response = await Character.findAll({where: {name: query.name}})
            if(query.movies) response = await Character.findAll({
                include: [{
                    model: Movie,
                    where: {
                        id: query.movies
                    }
                }]
            })
        } else {
            response = await Character.findAll({
                attributes: ['img', 'name']
            })
        }
        
        res.json(response)
    }

    const postCharacter = async(req, res) => {
        const { body } = req
        const character = Character.build(body)

        await character.save()

        res.json(character)
    }

    const deleteCharacter = async(req, res) => {
        const { params } = req

        console.log("a")
        try {
            await Character.destroy({
                where: {
                    id: params.characterId
                }
            })
            res.json("Deleted")
        } catch(err) {
            console.log(err)
        }        
    }

    const putCharacter = async(req, res) => {
        const { body, params } = req

        await Character.update(
            {
                img: body.img,
                name: body.name,
                age: body.age,
                weight: body.weight,
                history: body.history
            },
            {
                where: {
                  id: params.characterId  
                }
            }
        )

        res.json("Update")
    }

    const getCharacterDetails = async(req, res) => {
        const { params } = req

        const character = await Character.findOne({
            where: {
                id: params.characterId
            },
            include: Movie
        })


        res.json(character)
    }

    return { getCharacters, postCharacter, deleteCharacter, putCharacter, getCharacterDetails}
}

module.exports = characterController