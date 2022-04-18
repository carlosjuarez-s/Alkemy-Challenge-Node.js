const userController = require('../controllers/userController')
const express = require('express')
const userValidation = require('../validations/userValidation')
const validator = require('express-joi-validation').createValidator();

const routes = User => {
    const userRouter = express.Router()

    const controller = userController(User)
    const { postUser, postLogin } = controller

    userRouter
        .route('/auth/register')
        .post(validator.body(userValidation), postUser)

    userRouter
        .route('/auth/login')
        .post(postLogin)

    return userRouter
}

module.exports = routes