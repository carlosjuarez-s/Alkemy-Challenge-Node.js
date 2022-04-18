const joi = require('joi')

const userValidation = joi.object({
    userName: joi.string().alphanum().min(6).max(12).required(),
    password: joi.string().min(8).max(16).required(),
    email: joi.string().email().required()
})

module.exports = userValidation