const { Sequelize } = require('sequelize')
const express = require('express');
const bodyParser = require('body-parser')
const jwt = require('express-jwt')

//DB
const sequelize = new Sequelize('alkemy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

module.exports = sequelize

sequelize.authenticate()
    .then(() => {
        console.log("Todo ok")
    })
    .catch(error => {
        console.log("Error: ", error)
    })



//Modelos
const Character = require('./models/characterModel')
const Movie = require('./models/movieModel')
const CharacterMovie = require('./models/characterModel')
const associationModels = require('./models/characterMovieModel')
const User = require('./models/userModel')


//Routers
const characterRouter = require('./routers/characterRouter')(Character)
const movieRouter = require('./routers/movieRouter')(Movie)
const userRouter = require('./routers/userRouter')(User)


//APP
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*app.all('/api/*', jwt({
    secret: 'alkemy',
    algorithms: ['HS256'],
}).unless({
    path: ['/api/auth/login', '/api/auth/register']
}))*/

app.listen(8080, () => {
    console.log("Listen Server 8080")
})
app.use('/api', characterRouter, movieRouter, userRouter)
