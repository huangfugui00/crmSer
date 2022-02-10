const CustomerModel = require('../../model/customer');
const Utils = require('../../utils/util')


const authorize = async(userId,customerId)=>{
    const customer =await CustomerModel.findById(customerId)
    if(!customer) {
        throw new Error('customer not exist')
    }
    const authorize = await Utils.authorize(userId,customer.principal.toString())
    if(!authorize) {
        throw new Error('you have no authorize to modify the customer')
    }
    return true
}

module.exports={
    getCustomers:async(args,req)=>{
        if(!req.auth){
            console.log('not auth')
            throw new Error('not auth')
        }
        try{
            console.log('getcustomer')
            const customers = await CustomerModel.find()
                .populate('principal')
            if(!customers){
                throw new Error('error')
            }
            return customers
        }
        catch(err){
            throw new Error('error')
        }
    },
    deleteCustomer:async (args,req)=>{
        if(!req.auth){
            throw new Error('not auth')
        }
        try{
            console.log('deleteCustomer')
            await  authorize(req.userId,args._id)
            const customer = await CustomerModel.findByIdAndRemove(args._id)
            if (!customer) {
                throw new Error('server delete Error')
            }
            return customer;
        }
        catch(err){
            throw new Error(err)
        }
    },
    updateCustomer:async (args, req) =>{
        if(!req.auth){
            throw new Error('not auth')
        }
        try{
            console.log('updateCustomer')
            await  authorize(req.userId,args.updateInput._id)
            options={
                new:true,
            }
            const remCustomer = await CustomerModel.findByIdAndUpdate(args.updateInput._id,args.updateInput,options)
            if (!remCustomer) {
              throw new Error('Error')
            }
            return remCustomer;
        }
        catch(err){
            throw new Error(err)
        }
    },
    createCustomer:async(args,req)=>{
        if(!req.auth){
            throw new Error('not auth')
        }
        try{
            console.log('createCustomer')
            const body = {principal:req.userId,...args.createInput}
            const customer = await CustomerModel.create(body)
            return customer
        }
        catch(err){
            throw new Error(err)
        }
    }

    
    
}