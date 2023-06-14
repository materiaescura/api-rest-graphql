const jwt = require('jsonwebtoken')
const secret = 'secret'

const users = [
    {
        email:'auth@gmail.com',
        password:'1234'
    }
]

const auth = async (req, res) => {
    const {user, passwd} = req.body
    const userDB = users.filter(({email, password}) => user === email && password === passwd)

    if(userDB.length > 0) {
        const token = jwt.sign({user}, secret, {expiresIn:'2 days'})
        return res.send({
            succes: true,
            token
        })
    }

    return res.send({
        success: false,
        message:'wrong credentials'
    })

}

module.exports = {
    auth
}