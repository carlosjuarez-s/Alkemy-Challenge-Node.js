const joi = require('joi')

const movieValidation = joi.object({
    img: joi.string(),
    title: joi.string().max(24).required(),
    date_creation: joi.date(),
    rate: joi.number().min(0).max(5)
})

module.exports = movieValidation