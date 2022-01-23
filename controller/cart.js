const Utils = require('../utils/util')
const Cart = require('../model/cart')

const cartControl = {

    async addToCart(req,res,next){
        var cart = await Cart.findOne({userId:req.user.id,productId:req.body.productId})
            .catch(err=>console.log(err))
        if(cart){
            cart.numInCart = req.body.numToCart+cart.numInCart
            cart = await cart.save()
                .catch(err=>console.log(err))
            if(!cart){
                return Utils.responseClient(res,0,404,'')
            }
            return Utils.responseClient(res,1,200,'',cart)
        } 
        const data = {
            userId:req.user.id,
            productId:req.body.productId,
            numInCart:req.body.numToCart
        }
        cart = await Cart.create(data)
            .catch(err=>console.log(err))
        if(!cart){
            return Utils.responseClient(res,0,404,'')
        }
        return Utils.responseClient(res,1,200,'',cart)
    },

    async getCart(req,res,next){
        const carts = await Cart.find({userId:req.user.id})
            .catch(err=>console.log(err))
        if(!carts){
            return Utils.responseClient(res,0,404,'')
        }
        return Utils.responseClient(res,1,200,'',carts) 
    },

    async deleteCart(req,res,next){
        const cart = await Cart.findById(req.params.id)
            .catch((err)=>{console.log(err)})
        if(!cart){return Utils.responseClient(res,0,404,''); }
        if(cart.userId.toString()!== req.user.id){return Utils.responseClient(res,0,403,'') }
        const result = await cart.remove()
            .catch(err=>console.log(err))
        if(!result){
            return Utils.responseClient(res,0,404,'')
        }
        return Utils.responseClient(res,1,200,'Cart删除成功',result);  
    },

    async syncCart(req,res, next){
        try{
            for(let i =0;i<req.body.data.length;i++){
                const product = req.body.data[i]
                await Cart.findOneAndUpdate({productId:product.id,userId:req.user.id},{numInCart:product.numInCart},{ runValidators: true })
            }
            return Utils.responseClient(res,1,202,'')
        }
        catch{
            return Utils.responseClient(res,0,404,'')
        }
    }
}


module.exports = cartControl