const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema(
    {
        product:{
            type: String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        remark:{
            type:String
        }
    }
)

const ContractSchema = new Schema(
    {
        name:{
            type: String,
            required:true,
        },
        copName:{
            type:mongoose.Schema.ObjectId,
            ref:'Customer',
            required:true,
        },
        price:{
            type:Number,
        },
        signatory:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
        },
        cuSignatory:{
            type:mongoose.Schema.ObjectId,
            ref:'Contact'
        },
        contractType:{
            type:String,
            enum:['直销','代销','服务','快销']
        },
        products:{
            type:[productSchema],
            required:true,

        },
        remark:{
            type:String,
        },
        disCount:{
            type:Number,
            default:100,
        }

    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

ContractSchema.pre('findOneAndUpdate', async function(next) {
    const price = this.getUpdate().$set.products.reduce((total,product)=>total+Math.round(product.price),0)
    this.getUpdate().$set.price=price*this.getUpdate().$set.disCount/100
    next()
});

ContractSchema.pre('save', async function(next) {
    const price = this.products.reduce((total,product)=>total+Math.round(product.price),0)
    this.price=price*this.disCount/100
    next()
});

module.exports = mongoose.model('Contract', ContractSchema)