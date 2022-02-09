
const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;
const GraphQLDate = require('graphql-date');
const CustomerModel = require('../model/customer');
const ProfileModel = require('../model/profile');
const UserModel = require('../model/user');


const bcrypt = require('bcryptjs')
const Utils = require('../utils/util')

const userType = new GraphQLObjectType({
    name:"user",
    fields:()=>{
        return{
            email:{
                type:GraphQLString
            },
        }
    }
})

const customerType =  new GraphQLObjectType({
    name:'customer',
    fields:()=>{
        return{
            _id:{
                type:GraphQLString
            },
            name:{
                type:GraphQLString
            },
            phone:{
                type:GraphQLString
            },
            come:{
                type:GraphQLString
            },
            mobilePhone:{
                type:GraphQLString, 
            },
            email:{
                type:GraphQLString,
            },
            url:{
                type:GraphQLString,
            },
            industry:{
                type:GraphQLString,
            },
            level:{
                type:GraphQLString,
            },
            nextTime:{
                type:GraphQLDate,
            },
            address:{
                type:GraphQLString,
            },
            remark:{
                type:GraphQLString,
            },
            principal:{
                type:profileType,
            }
        }
    }
})

const profileType = new GraphQLObjectType({
    name:'profileType',
    fields:()=>{
        return{
            _id:{
                type:GraphQLString
            },
            username:{
                type:GraphQLString
            },
            phone:{
                type:GraphQLString
            },
          
            userId:{
                type:userType,
            },

            leader:{
                type:profileType,
            }


        }
    }
})

const queryType = new GraphQLObjectType({
    name:'Query',
    fields:()=>{
        return{
            customers:{
                type: new GraphQLList(customerType),
                resolve:async ()=>{
                    const customers = await CustomerModel.find()
                        .populate('principal')
                    if(!customers){
                        throw new Error('error')
                    }
                    return customers
                }
            },
            customer:{
                type: customerType,
                args:{
                    _id:{
                        type:new GraphQLNonNull(GraphQLString),
                    }
                },
                resolve:async (root, params)=>{
                    const customer = await CustomerModel.findById(params._id)
                    if(!customer){
                        throw new Error('error')
                    }
                    return customer
                }
            },
            profiles:{
                type: new GraphQLList(profileType),
                resolve:async ()=>{
                    const profiles = await ProfileModel.find()
                        .populate('userId')
                        .populate('leader')

                    if(!profiles){
                        throw new Error('error')
                    }
                    return profiles
                }
            },
            profile:{
                type:profileType,
                args:{
                    _id:{
                        type:new GraphQLNonNull(GraphQLString),
                    }
                },
                resolve:async (root, params)=>{
                    const profile = await ProfileModel.findById(params._id)
                    .populate('userId')
                    if(!profile){
                        throw new Error('error')
                    }
                    return profile
                }
            }
        }
    }
})

const mutationType = new GraphQLObjectType({
    name:'Mutation',
    fields:()=>{
        return {
            login:{
                type:userType,
                args:{
                    email:{type:new GraphQLNonNull(GraphQLString) },
                    password:{type:new GraphQLNonNull(GraphQLString) },
                },
                resolve:async (root, params)=>{
                    const user = await UserModel.findOne( {email: params.email})
                    if(! user){
                        return  Utils.responseClient(res,0,400,'登录凭证有误')  
                    }
            
                    const isMatch = await  user.matchPassword(params.password)
            
                    if (!isMatch) {
                        return  Utils.responseClient(res,0,400,'登录凭证有误')
                    }
                    const token = user.getSignedJwtToken()
                    const options = {
                        expires: new Date(
                          Date.now() + config.JWT.expire_day * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                      }
                    Utils.responseClient(res,1,200,'登录成功',{'token':token})
                }
            },
            addCustomer:{
                type:customerType,
                args:{
                    name:{
                        type:new GraphQLNonNull(GraphQLString)
                    },
                    phone:{
                        type:new GraphQLNonNull(GraphQLString)
                    },
                    come:{
                        type:GraphQLString
                    },
                    mobilePhone:{
                        type:GraphQLString, 
                    },
                    email:{
                        type:GraphQLString,
                    },
                    url:{
                        type:GraphQLString,
                    },
                    industry:{
                        type:GraphQLString,
                    },
                    level:{
                        type:GraphQLString,
                    },
                    address:{
                        type:GraphQLString,
                    },
                    remark:{
                        type:GraphQLString,
                    },
                    nextTime:{
                        type:GraphQLDate,
                    },
                    principal:{
                        type:GraphQLString,
                    },
                },
                resolve:async (root, params)=>{
                    const customer = await CustomerModel.create(params)
                    if(!customer){
                        throw new Error('error')
                    }
                    return customer
                }

            },
            deleteCustomer:{
                type:customerType,
                args:{
                    _id:{
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remCustomer = CustomerModel.findByIdAndRemove(params._id).exec();
                    if (!remCustomer) {
                      throw new Error('Error')
                    }
                    return remCustomer;
                  }
            },
            updateCustomer:{
                type:customerType,
                args:{
                    _id:{
                        type:new GraphQLNonNull(GraphQLString),
                        require:true,
                    },
                    name:{
                        type:GraphQLString
                    },
                    phone:{
                        type:GraphQLString
                    },
                    come:{
                        type:GraphQLString
                    },
                    mobilePhone:{
                        type:GraphQLString, 
                    },
                    email:{
                        type:GraphQLString,
                    },
                    url:{
                        type:GraphQLString,
                    },
                    industry:{
                        type:GraphQLString,
                    },
                    level:{
                        type:GraphQLString,
                    },
                    nextTime:{
                        type:GraphQLDate,
                    },
                    remark:{
                        type:GraphQLString,
                    },
                    principal:{
                        type:GraphQLString,
                    },
                    address:{
                        type:GraphQLString,
                    },
                    
                },
                resolve(root,params){
                    options={
                        new:true,
                    }
                    const remCustomer = CustomerModel.findByIdAndUpdate(params._id,params,options).exec();
                    if (!remCustomer) {
                      throw new Error('Error')
                    }
                    return remCustomer;
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({query: queryType , mutation:mutationType});