const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail')

const userController = User => {
    const postUser = async(req, res) => {
        const { body } = req
        const user = User.build(body)

        await user.save()
        
        sgMail.setApiKey('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')
        const msg = {
          to: body.email, // Change to your recipient
          from: 'carloe2000@gmail.com', // Change to your verified sender
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
        
        res.json(user)
    }

    const postLogin = async(req, res) => {
        const { body } = req

        const user = await User.findOne({
            where: {
                userName: body.userName
            }
        })

        if(user.password === body.password) {
            res.json({message: "Login!", token: generatedToken(user)})
        } else {
            res.status(200).send("Invalid Credentials")
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