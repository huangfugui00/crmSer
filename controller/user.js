const bcrypt = require('bcryptjs')
const Utils = require('../utils/util')
const User = require('../model/user');
// const upload = require('../services/uploadMulter');
const config = require('../config/config')
const fs = require('fs');



const userControl = {
    async register(req, res, next){
        const userBody = req.body
        if(await User.findOne( {email: userBody.email})){
            return Utils.responseClient(res,0,404,'用户已经存在')
        }
        if (userBody.password) {
            userBody.hashPassword = bcrypt.hashSync(userBody.password, 10);
        }
        // create user
        const user = await  User.create(userBody)
            .catch((err)=>console.log(err))
        if(!user){
            return Utils.responseClient(res,0,404,'数据错误')
        }
        Utils.responseClient(res,1,200,'用户创建成功',user);
    },

    async login(req, res, next){
        const userBody = req.body
        const user = await User.findOne( {email: userBody.email})
        if(! user){
            return  Utils.responseClient(res,0,400,'登录凭证有误')  
        }

        const isMatch = await  user.matchPassword(userBody.password)

        if (!isMatch) {
            return  Utils.responseClient(res,0,400,'登录凭证有误')
        }

        const token = user.getSignedJwtToken()
        const options = {
            expires: new Date(
              Date.now() + config.JWT.expire_day * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
          }
        Utils.responseClient(res,1,200,'登录成功',{'token':token})
    },

    async getMe(req, res, next){
        const user = req.user
        Utils.responseClient(res,1,200,'',{'user':user})
    },

    async getUserById(req,res,next){
        const userId = req.params.id
        const user = await User.findById(userId)
                                .catch((err)=>{
                                    console.log(err)
                                })
        if(!user){return Utils.responseClient(res,0,404,'User不存在',{})}
        Utils.responseClient(res,1,200,'',{'user':user})
    } ,
        
}

module.exports = userControl
