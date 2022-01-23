const Utils = require('../utils/util')
const Order = require('../model/order')

const orderControl = {
    async createOrder(req,res,next){
        var body = req.body
        body.userId = req.user.id
        order = await Order.create(body)
            .catch((err)=>console.log(err))   
        if(!order){
            return Utils.responseClient(res,0,404,'');
        }
        return Utils.responseClient(res,1,200,'',order);
    }, 

    async getOrders(req,res,next){
        let orders = await Order.find({userId:req.user.id})
            .populate({
                path:'products',
                populate:{
                    path:'product'
                }
            })
            .populate('deliver')
            .catch(err=>console.log(err))
        if(!orders){
            return Utils.responseClient(res,0,404,'');
        }
        Utils.responseClient(res,1,200,'',orders);  
    }, 

    async getOrder(req,res,next){
        const order = await Order.findById(req.params.id)
            .populate('products')
            .populate('deliver')
            .catch(err=> console.log(err))//将err传出到访问层

        if (!order) {
            return Utils.responseClient(res,0,400,'产品不存在');
        }
        if(order.userId.toString()!= req.user.id && !req.user.isAdmin){
            return Utils.responseClient(res,0,403,'') 
        }
        Utils.responseClient(res,1,200,'',order);  
    }, 
    
    async deleteOrder(req,res,next){
        let order = await Order.findById(req.params.id)
            .catch((err)=>{console.log(err)})
        if (!order) {
            return Utils.responseClient(res,0,400,'order不存在');
        }
        if(order.userId.toString()!=req.user.id && !req.user.isAdmin ){
            return Utils.responseClient(res,0,403,'抱歉，您无权删除该记录');
        }
        await order.remove()
        Utils.responseClient(res,1,200,'order已删除'); 
    },
 
    async updateOrderStatus(req,res,next){
        let order = await Order.findById(req.params.id)
        .catch((err)=>{console.log(err)})
        if (!order) {
            return Utils.responseClient(res,0,204,'order不存在');
        }
        if(order.userId.toString()!=req.user.id && !req.user.isAdmin ){
            return Utils.responseClient(res,0,403,'抱歉，您无权删除该记录');
        }
        order.status=req.body.status
        await order.save()
            .catch(err=>console.log(err))
        Utils.responseClient(res,1,200,'',order);
    }


    
}


module.exports = orderControl