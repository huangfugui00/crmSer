const mongoose = require('mongoose')

const Schema = mongoose.Schema


const ContactSchema = new Schema(
    {
        name:{
            type: String,
            required:true,
            unique:true
        },
        copName:{
            type:mongoose.Schema.ObjectId,
            ref:'Customer',
        },
        phone:{
            type:String,
            required:false
        },
        principal:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
        },
        mobilePhone:{
            type:String,
            required:false
        },
        email:{
            type:String,
            required:false,
            uniqueCaseInsensitive: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ],
        },
        nextTime:{
            type:Date,
        },
        gender:{
            type:String,
            enum:['男' , '女']
        },
        jobTitle:{
          type:String,
        },
        address:{
            type:String,
        },
        remark:{
            type:String,
        }

    }
)


module.exports = mongoose.model('Contact', ContactSchema)