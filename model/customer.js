const mongoose = require('mongoose')

const Schema = mongoose.Schema


const CustomerSchema = new Schema(
    {
        name:{
            type: String,
            required:true,
            unique:true
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
        url:{
            type:String,
        },
        industry:{
            type:String,
            enum:['金融业' , 'IT' ,'房地产','商业服务','政府' , '其他'],
        },
        level:{
            type:String,
            enum:['A(重点)' , 'B(普通客户)' , 'C(非优先客户)'],
        },
        nextTime:{
            type:Date,
        },
        come:{
            type:String,
            enum:['线上' , '邮件' ,'介绍','促销','预约', '广告']
        },
        address:{
            type:String,
        },
        remark:{
            type:String,
        }

        
    }
)



module.exports = mongoose.model('Customer', CustomerSchema)