const Utils = require('../utils/util')
const Deliver = require('../model/deliver')

const deliverControl = {
    async createDeliver(req,res,next){    
        let firstDeliver = false
        const delivers = await Deliver.find({userId:req.user.id})
        if(!delivers.length){
            firstDeliver = true
        }
        var body = req.body
        body.userId = req.user.id
        if(firstDeliver){
            body.default = true
        }
        deliver = await Deliver.create(body)
            .catch((err)=>console.log(err))   
        if(!deliver){
            return Utils.responseClient(res,0,404,'');
        }
        return Utils.responseClient(res,1,200,'',deliver);
    },    

    async getDelivers(req,res,next){
        if(req.query.default){
            deliver =await Deliver.findOne({userId:req.user.id,default:true})
                .catch(err=>console.log(err))
            if(!deliver){
                return Utils.responseClient(res,0,404,'')
            }
            Utils.responseClient(res,1,200,'',deliver);  
        }
        else{
            const delivers = await Deliver.find({userId:req.user.id})
            Utils.responseClient(res,1,200,'',delivers);  
        }
    }, 

    async getDeliver(req,res,next){
        const delivers = await Deliver.findById(req.params.id)
        Utils.responseClient(res,1,200,'',delivers);  
    }, 

    async setDefaultDeliver(req,res,next){
        const deliver = await Deliver.findById(req.params.id)
            .catch(err=>console.log(err))
        if(!deliver){ return Utils.responseClient(res,0,404,'') }
        if(deliver.userId.toString()!= req.user.id && !req.user.isAdmin){
            return Utils.responseClient(res,0,403,'') 
        }
        if(!deliver.default){
            await Deliver.updateMany({"default": true},{"$set":{"default": false}})
            deliver.default = true
            await deliver.save()
                .catch(err=>console.log(err))
            Utils.responseClient(res,1,200,'',deliver);  
        }
        Utils.responseClient(res,1,200,'',deliver); 
    },

    async updateDeliver(req,res,next){
        let deliver = await Deliver.findById(req.params.id)
            .catch(err=>console.log(err))
        if(!deliver){ return Utils.responseClient(res,0,404,'') }
        if(deliver.userId.toString()!= req.user.id && !req.user.isAdmin){
            return Utils.responseClient(res,0,403,'') 
        }
        deliver = await Deliver.findByIdAndUpdate(req.params.id,req.body)
            .catch(err=>console.log(err))
        if(!deliver){
            return Utils.responseClient(res,0,404,'')
        }
        Utils.responseClient(res,1,200,'',deliver); 
    }
    

}


module.exports = deliverControl