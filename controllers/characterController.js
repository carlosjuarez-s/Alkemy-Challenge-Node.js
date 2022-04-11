const characterController = Character =>{

    const getCharacters = async(req, res) => {
        const response = await Character.findAll({
            attributes: ['img', 'name']
        })

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
        await Character.destroy({
            where: {
                id: params.characterId
            }
        })

        res.json("Deleted")
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