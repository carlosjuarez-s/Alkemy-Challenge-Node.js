const jwt = require('jsonwebtoken');

const userController = User => {
    const postUser = async(req, res) => {
        const { body } = req
        const user = User.build(body)
        
        await user.save()
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