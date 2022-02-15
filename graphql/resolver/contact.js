const Model = require('@/model/contact');
const Utils = require('@/utils/util')




const authorize = async(userId,id)=>{
    const model =await Model.findById(id)
    if(!model) {
        throw new Error('model not exist')
    }
    const authorize = await Utils.authorize(userId,model.principal.toString())
    if(!authorize) {
        throw new Error('you have no authorize to modify the model')
    }
    return true
}

module.exports={
    getContacts:async(args,req)=>{
        if(!req.auth){
            console.log('not auth')
            throw new Error('not auth')
        }
        try{
            console.log('getContacts')
            const customers = await Model.find()
                .populate('principal')
                .populate('copName')
            if(!customers){
                throw new Error('error')
            }
            return customers
        }
        catch(err){
            throw new Error('error')
        }
    },
    deleteContact:async (args,req)=>{
        if(!req.auth){
            throw new Error('not auth')
        }
        try{
            console.log('deleteCustomer')
            await  authorize(req.userId,args._id)
            const model = await Model.findByIdAndRemove(args._id)
            if (!model) {
                throw new Error('server delete Error')
            }
            return model;
        }
        catch(err){
            throw new Error(err)
        }
    },
    updateContact:async (args, req) =>{
        if(!req.auth){
            throw new Error('not auth')
        }
        try{
            console.log('updateCustomer')
            await  authorize(req.userId,args.updateInput._id)
            options={
                new:true,
            }
            const model = await Model.findByIdAndUpdate(args.updateInput._id,args.updateInput,options)
            if (!model) {
                throw new Error('Error')
            }
            return model;
        }
        catch(err){
            throw new Error(err)
        }
    },
    createContact:async(args,req)=>{
        if(!req.auth){
            throw new Error('not auth')
        }
        try{
            console.log('createCustomer')
            const body = {principal:req.userId,...args.createInput}
            const model = await Model.create(body)
            return model
        }
        catch(err){
            throw new Error(err)
        }
    }



}