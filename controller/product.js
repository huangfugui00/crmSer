const Utils = require('../utils/util')
const Product = require('../model/product')
const Favorite = require('../controller/favorite') 

const productControl = {
    async getProducts(req,res,next){
        let products = await Product.find({})
            .populate('comments')
            .populate('category')
            .populate('favorite')
        if(!products){
            return Utils.responseClient(res,1,200,'仓库中暂无商品');
        }
        if(req.query.category ){
            products = products.filter(product=>product.category&&product.category.title===req.query.category)
        }
        Utils.responseClient(res,1,200,'',products);  
    }, 

    async getProduct(req,res,next){
        const product = await Product.findById(req.params.id)
            .populate('comments')
            .populate({path:'category',select: 'title' })
            .catch(err=> console.log(err))//将err传出到访问层

        if (!product) {
            return Utils.responseClient(res,0,400,'产品不存在');
        }
        Utils.responseClient(res,1,200,'',product);  
    }, 
}


module.exports = productControl