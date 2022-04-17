const characterController = require('../controllers/characterController')
const express = require('express');


const router = Character => {
    const characterRouter = express.Router();

    const controller = characterController(Character)
    const { getCharacters, postCharacter, deleteCharacter, putCharacter, getCharacterDetails } = controller

    characterRouter
        .route('/characters')
        .get(getCharacters)
        .post(postCharacter)
    
    characterRouter
        .route('/character/:characterId')
        .delete(deleteCharacter)
        .put(putCharacter)
        .get(getCharacterDetails)


    return characterRouter;
}

module.exports = router