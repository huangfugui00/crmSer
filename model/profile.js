const mongoose = require('mongoose')

const Schema = mongoose.Schema


const ProfileSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Please add an email'],
          },
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
            ref:'Profile',
            required:true,
        }
    },
)




module.exports = mongoose.model('Profile', ProfileSchema)