const CustomerModel = require('../../model/customer');

module.exports={
    getCustomers:async()=>{
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
    updateCustomer:async (args, req) =>{
        try{
            console.log('updateCustomer')
            options={
                new:true,
            }
            const remCustomer = CustomerModel.findByIdAndUpdate(args.updateInput._id,args.updateInput,options).exec();
            if (!remCustomer) {
              throw new Error('Error')
            }
            return remCustomer;
        }
        catch(err){
            throw new Error('error')
        }
    }
}