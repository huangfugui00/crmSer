const jwt = require('jsonwebtoken')
const User = require('../model/user')
require('dotenv').config()


const Auth={
    async protect(req,res,next){
        console.log('auth middle')
        req.auth = false
        let token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        )
        {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) {
           return next()
        }   
        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id
            req.auth = true
            return next()
          } catch (err) {
            return next()            
        }
    },
      
}


module.exports = Auth