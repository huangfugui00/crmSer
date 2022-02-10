const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const Schema = mongoose.Schema


const ProfileSchema = new Schema(
    {
        phone:{
            type:String,
        },
        userId:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true,
        },
        leader:{//上级领导
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true,
        }
    },
)



module.exports = mongoose.model('Profile', ProfileSchema)