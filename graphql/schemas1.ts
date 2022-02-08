
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



type userType = {
    email:String
}


const userType = new GraphQLObjectType({
    name:"user",
    fields:()=>{
        return{
            email:{
                type:GraphQLString
            }
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
                    id:{
                        name:'_id',
                        type:GraphQLString,
                    }
                },
                resolve:async (root, params)=>{
                    const customer = await CustomerModel.findById(params.id)
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
                    id:{
                        name:'_id',
                        type:GraphQLString,
                    }
                },
                resolve:async (root, params)=>{
                    const profile = await ProfileModel.findById(params.id)
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
                    nextTime:{
                        type:GraphQLDate,
                    },
                    principal:{
                        type:profileType,
                    }
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
                    id:{
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remCustomer = CustomerModel.findByIdAndRemove(params.id).exec();
                    if (!remCustomer) {
                      throw new Error('Error')
                    }
                    return remCustomer;
                  }
            },
            updateCustomer:{
                type:customerType,
                args:{
                    id:{
                        type:GraphQLString
                        // type:new GraphQLNonNull(GraphQLString)
                    },
                    name:{
                        type:GraphQLString,
                    },
                    phone:{
                        type:GraphQLString,
                    },
                },
                resolve(root,params){
                    // const body = {name:params.name,phone:params.phone}
                    console.log(params)
                    const remCustomer = CustomerModel.findByIdAndUpdate(params.id,params).exec();
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