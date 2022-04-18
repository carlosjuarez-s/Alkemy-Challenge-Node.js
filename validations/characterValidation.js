const joi = require('joi')

const characterValidation = joi.object({
    img: joi.string(),
    name: joi.string().max(24).required(),
    age: joi.number(),
    weight: joi.number(),
    history: joi.string().max(120)
})

module.exports = characterValidation