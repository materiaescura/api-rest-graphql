const jwt = require('jsonwebtoken')
const secret = 'secret'

const getToken = authorization => {
    const tokenHeader = authorization.match(/^Bearer\s(?<token>.+)/)
    return tokenHeader?.groups?.token
}

// const needsAuth = (req, res, next) => {
//     if(req.headers && req.headers.authorization) {
//          const {authorization} = req.headers
//          const token = getToken(authorization)
//          try {
//             const payload = jwt.verify(token, secret)
//             res.locals.user = payload.user
//             return next()
//          } catch {
            
//          }     
//     }

//     return res.send({
//         error: true,
//         message: 'Needs auth'
//     })
// }


const needsAuth = (req, res, obj, fn) => {
    if(req.headers && req.headers.authorization) {
         const {authorization} = req.headers
         const token = getToken(authorization)
         try {
            const payload = jwt.verify(token, secret)
            return fn(payload)
         } catch {
            
         }     
    }

    return res.send(obj)
}

const restNeedsAuth = (req, res,  next) => {
    return needsAuth(req, res,  {error: true, message:'Needs Auth'}, payload => {
        res.locals.user = payload.user
        return next()
    })
}

const graphqlNeedsAuth = req => {
    const res = {}
    res.send = obj => obj
    return needsAuth(req, res, {}, payload => {
        return {user: payload.user}
    })
} //depois ver uma refatoração melhor

module.exports = {
    restNeedsAuth,
    graphqlNeedsAuth
}