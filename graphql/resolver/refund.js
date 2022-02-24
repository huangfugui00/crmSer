const Model = require('@/model/refund');
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

module.exports= {
    getRefunds: async (args, req) => {
        if (!req.auth) {
            throw new Error('not auth')
        }
        try {
            console.log('getRefunds')
            const refunds = await Model.find()
                .populate('principal')
                .populate('copName')
                .populate('contract')
            if (!refunds) {
                throw new Error('error')
            }
            return refunds
        } catch (err) {
            throw new Error('error')
        }
    },

    deleteRefund:async (args,req)=>{
        if(!req.auth){
            throw new Error('not auth')
        }
        try{
            console.log('deleteRefund')
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

    updateRefund:async (args, req) =>{
        if(!req.auth){
            throw new Error('not auth')
        }
        try{
            console.log('updateContact')
            await  authorize(req.userId,args.updateInput._id)
            options={
                new:true,
            }
            const model = await Model.findByIdAndUpdate(args.updateInput._id,args.updateInput,options)
                .populate('principal')
                .populate('copName')
                .populate('contract')
            if (!model) {
                throw new Error('Error')
            }
            return model;
        }
        catch(err){
            throw new Error(err)
        }
    },
    createRefund:async(args,req)=>{
        if(!req.auth){
            throw new Error('not auth')
        }
        try{
            console.log('createRefund')
            const body = {signatory:req.userId,...args.createInput}
            const model = await Model.create(body)
            await Promise.all([model.populate('principal'), model.populate('copName'),model.populate('contract')]);
            return model
        }
        catch(err){
            throw new Error(err)
        }
    }
}