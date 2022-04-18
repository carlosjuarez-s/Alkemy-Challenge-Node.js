const characterController = require('../controllers/characterController')
const express = require('express');
const characterValidation = require('../validations/characterValidation')
const validator = require('express-joi-validation').createValidator();


const router = Character => {
    const characterRouter = express.Router();

    const controller = characterController(Character)
    const { getCharacters, postCharacter, deleteCharacter, putCharacter, getCharacterDetails } = controller

    characterRouter
        .route('/characters')
        .get(getCharacters)
        .post(validator.body(characterValidation), postCharacter)
    
    characterRouter
        .route('/character/:characterId')
        .delete(deleteCharacter)
        .put(validator.body(characterValidation), putCharacter)
        .get(getCharacterDetails)


    return characterRouter;
}

module.exports = router