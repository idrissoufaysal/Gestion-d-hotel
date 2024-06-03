const jwt = require('jsonwebtoken')
const { creatError } = require('./error')

 const verifyToken = (req, res, next) => {
    const token = req.cookie.accessToken
    if (!token) {
        return next(creatError(401, "you are not authentiquated"))
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(creatError(401, "token is not valid"))
        req.user = user
        next()
    })
}

 const verifyUser=(req,res,next)=>{
verifyToken(req,res,()=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        next()
    } else {
        if(err) return next(creatError(403,"you are not authorized"))
    }
})
}

module.exports={verifyToken,verifyUser}