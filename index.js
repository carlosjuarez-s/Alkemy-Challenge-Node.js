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

    
    /*const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey('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')
    console.log(process.env.SENDGRID_API_KEY)
    const msg = {
      to: 'carloe2000@gmail.com', // Change to your recipient
      from: 'carloe2000@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })*/


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


