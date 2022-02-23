const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const config = require('../config/config')
const Schema = mongoose.Schema





const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add an name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            uniqueCaseInsensitive: true,
            match: [
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              'Please add a valid email'
            ],
            minlength: [6, 'Must be six characters long'],
          },
        hashPassword: {
            type: String,
            required: [true, 'Please add a password'],
        },
        roles:[{
            type:String,
            enum : ['admin','manager','employee'],
        }],
        
    }
)

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.hashPassword)
  }
  
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: `${config.JWT.expire_day}d`
  })
}


module.exports = mongoose.model('User', UserSchema)