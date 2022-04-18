const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail')
const key = require('../key')

const userController = User => {
    const postUser = async(req, res) => {
        const { body } = req
        const user = User.build(body)

        await user.save()
        
        sgMail.setApiKey(key())
        const msg = {
          to: body.email, 
          from: 'carloe2000@gmail.com', 
          subject: 'Welcome to Disney!',
          text: 'Welcome',
          html: '<strong>You are registered!</strong>',
        }
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent')
          })
          .catch((error) => {
            console.error(error)
          })
        
        res.json("User registered")
    }

    const postLogin = async(req, res) => {
        const { body } = req

        const user = await User.findOne({
            where: {
                userName: body.userName
            }
        })

        if(!user) res.status(404).send("Invalid Credentials")

        if(user.password === body.password) {
            res.json({message: "Login!", token: generatedToken(user)})
        } else {
            res.status(404).send("Invalid Credentials")
        }
    }

    const generatedToken = User => {
        const paylod = {
            user: User.userName
        }

        return jwt.sign(paylod, "alkemy")
    }

    return { postUser, postLogin }
}

module.exports = userController