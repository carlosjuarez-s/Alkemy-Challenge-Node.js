const userController = require('../controllers/userController')
const express = require('express')

const routes = User => {
    const userRouter = express.Router()

    const controller = userController(User)
    const { postUser, postLogin } = controller

    userRouter
        .route('/auth/register')
        .post(postUser)

    userRouter
        .route('/auth/login')
        .post(postLogin)

    return userRouter
}

module.exports = routes