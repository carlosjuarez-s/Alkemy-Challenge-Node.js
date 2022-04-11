const { Sequelize, INTEGER, DataTypes } = require('sequelize')
const express = require('express');
const bodyParser = require('body-parser')

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

//Routers
const characterRouter = require('./routers/characterRouter')(Character)
const movieRouter = require('./routers/movieRouter')(Movie)

//APP
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(8080, () => {
    console.log("Listen Server 8080")
})
app.use('/api', characterRouter, movieRouter)
