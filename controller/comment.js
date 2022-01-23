const Utils = require('../utils/util')
const Comment = require('../model/comment')

const commentControl = {
    async createComment(req,res,next){
        let comment = await Comment.findOne({
            productId:req.body.productId,
            userId:req.user.id,
            })
            .catch((err)=>console.log(err))

        if(!comment){
            var body = req.body
            body.userId = req.user.id
            comment = await Comment.create(body)
                .catch((err)=>console.log(err))   
            if(!comment){
                return Utils.responseClient(res,0,404,'');
            }
            return Utils.responseClient(res,1,200,'',comment);
        }
        else{
            return Utils.responseClient(res,0,200,'');
        }
    }, 
    
}


module.exports = commentControl