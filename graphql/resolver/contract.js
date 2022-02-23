const Model = require('@/model/contract');
const Utils = require('@/utils/util')




const authorize = async(userId,id)=>{
    const model =await Model.findById(id)
    if(!model) {
        throw new Error('model not exist')
    }
    const authorize = await Utils.authorize(userId,model.signatory.toString())
    if(!authorize) {
        throw new Error('you have no authorize to modify the model')
    }
    return true
}

module.exports= {
    getContracts: async (args, req) => {
        if (!req.auth) {
            console.log('not auth')
            throw new Error('not auth')
        }
        try {
            console.log('getContracts')
            const contracts = await Model.find()
                .populate('signatory')
                .populate('copName')
                .populate('cuSignatory')
            if (!contracts) {
                throw new Error('error')
            }
            return contracts
        } catch (err) {
            throw new Error('error')
        }
    },

    deleteContract:async (args,req)=>{
        if(!req.auth){
            throw new Error('not auth')
        }
        try{
            console.log('deleteContract')
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

    updateContract:async (args, req) =>{
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
                .populate('signatory')
                .populate('copName')
                .populate('cuSignatory')
            if (!model) {
                throw new Error('Error')
            }
            return model;
        }
        catch(err){
            throw new Error(err)
        }
    },
    createContract:async(args,req)=>{
        if(!req.auth){
            throw new Error('not auth')
        }
        try{
            console.log('createContract')
            const body = {signatory:req.userId,...args.createInput}
            const model = await Model.create(body)
            await Promise.all([model.populate('signatory'), model.populate('copName'),model.populate('cuSignatory')]);
            return model
        }
        catch(err){
            throw new Error(err)
        }
    }
}