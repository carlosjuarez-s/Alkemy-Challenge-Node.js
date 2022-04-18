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
        console.log("All ok")
    })
    .catch(error => {
        console.log("Error: ", error)
    })

//Modelos
const Character = require('./models/characterModel')
const Movie = require('./models/movieModel')
const CharacterMovie = require('./models/characterModel')
const associationModelsCharacterMovie = require('./models/characterMovieModel')
const User = require('./models/userModel')
const MovieGenreModel = require('./models/movieGenreModel')
const associationModelsMovieGenre = require('./models/characterMovieModel')


//Routers
const characterRouter = require('./routers/characterRouter')(Character)
const movieRouter = require('./routers/movieRouter')(Movie)
const userRouter = require('./routers/userRouter')(User)


//APP
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/*', jwt({
    secret: 'alkemy',
    algorithms: ['HS256'],
}).unless({
    path: ['/auth/login', '/auth/register']
}))

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
  });

app.listen(8080, () => {
    console.log("Listen Server 8080")
})

app.use('/', characterRouter, movieRouter, userRouter)


