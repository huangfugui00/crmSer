const Utils = require('../utils/util')
const Favorite = require('../model/favorite')

const favoriteControl = {
    async getFavorite(req,res,next){
        const favorites = await Favorite.find({userId:req.user.id})
                .catch(err=>console.log(err))
        if(!favorites){
            return Utils.responseClient(res,0,404,'');
        }
        Utils.responseClient(res,1,200,'',favorites);  
    },

    async crateFavorite(req,res,next){
        let favorite = await Favorite.findOne({
            productId:req.body.productId,
            userId:req.user.id,
            })
            .catch((err)=>console.log(err))

        if(!favorite){
            var body = req.body
            body.userId = req.user.id
            body.productId = req.body.productId
            favorite = await Favorite.create(body)
                .catch((err)=>console.log(err))   
            if(!favorite){
                return Utils.responseClient(res,0,404,'');
            }
            return Utils.responseClient(res,1,200,'',favorite);
        }
        else{
            return Utils.responseClient(res,1,204,'您已给该商品点过赞了');
        }
    }, 

    async checkFavorite(req,res,next){
        let favorite = await Favorite.findOne({
            productId:req.body.productId,
            userId:req.user.id,
            })
            .catch((err)=> console.log(err))
        if(!favorite){
            return Utils.responseClient(res,1,200,'favorite不存在',{'exist':false});
        }
        else{
            return Utils.responseClient(res,1,200,'您已给该商品点过赞了',{'exist':true,favorite});
        }
    }, 

    async deleteFavorite(req,res,next){
        let favorite = await Favorite.findById(req.params.id)
            .catch((err)=>{console.log(err)})
        if (!favorite) {
            return Utils.responseClient(res,0,204,'favorite不存在');
        }
        if(favorite.userId.id!=req.user.id && !req.user.isAdmin ){
            return Utils.responseClient(res,0,403,'抱歉，您无权删除该记录');
        }
        await favorite.remove()
        Utils.responseClient(res,1,200,'favorite已删除'); 
    }

    
}


module.exports = favoriteControl