const mongoose = require('mongoose')
const Contract =  require('./contract');
const Schema = mongoose.Schema


const RefundSchema = new Schema(
    {
        copName:{
            type:mongoose.Schema.ObjectId,
            ref:'Customer',
        },
        contract:{
            type:mongoose.Schema.ObjectId,
            ref:'Contract',
        },
        principal:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
        },
        refundPrice:{
            type:Number,
        },
        refundDate:{
            type:Date,
        },
        refundType:{
            type:String,
            enum:['境外汇款' , '支付宝' ,'微信','现金','银行转账' ],
        },
        remark:{
            type:String,
        },
        contractPrice:{
            type:Number,
        },
    }
)

async function  updateContract(contractId,refundPrice){
    let contract = await Contract.findById(contractId)
    this.contractPrice=contract.price
    //更新相应合同的已支付与未支付
    const updateInput={
        _id:contract._id,
        paid:contract.paid+refundPrice,
        unPaid: contract.unPaid-refundPrice,
    }
    contract = await Contract.findByIdAndUpdate(contract._id,updateInput)
    return contract
}


RefundSchema.pre('findOneAndUpdate', async function(next) {
    if(this.getUpdate()._id){
        // graphql server
        if( this.getUpdate().refundPrice){
            const docToUpdate = await this.model.findOne(this.getQuery());
            const contract = await updateContract(docToUpdate.contract._id,this.getUpdate().refundPrice-docToUpdate.refundPrice)
        }
    }
    else{
        // adminBro
        const contract = await updateContract(this.getUpdate().$set.contract,this.getUpdate().$set.refundPrice)
    }
    next()
});


RefundSchema.pre('save', async function(next) {
    //补充contractPrice
    const contract = await updateContract(this.contract._id,this.refundPrice)
    this.contractPrice=contract.price
    next()
});

RefundSchema.post('findOneAndRemove', async function(refund,next) {
    const contract = await updateContract(refund.contract.toString(),-refund.refundPrice)
    next()
});


module.exports = mongoose.model('Refund', RefundSchema)