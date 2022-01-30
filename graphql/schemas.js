
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var CustomerModel = require('../model/customer');
var ProfileModel = require('../model/profile');



var userType = new GraphQLObjectType({
    name:"user",
    fields:()=>{
        return{
            email:{
                type:GraphQLString
            }
        }
    }
})

var customerType =  new GraphQLObjectType({
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

var profileType = new GraphQLObjectType({
    name:'profile',
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

var queryType = new GraphQLObjectType({
    name:'Query',
    fields:()=>{
        return{
            customers:{
                type: new GraphQLList(customerType),
                resolve:async ()=>{
                    const customers = await CustomerModel.find()
                        .populate('principal')
                    console.log(customers)
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

                    console.log(profiles)
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

module.exports = new GraphQLSchema({query: queryType});