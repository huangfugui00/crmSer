const { buildSchema } = require('graphql');


module.exports = buildSchema(`
scalar Date

type User {
    _id: ID!
    email:String
}
type Profile {
  _id: ID!
  username: String
  phone: String
  userId: User
  leader: Profile
}
type Customer {
    _id: ID!
    url:String
    name:String
    phone:String
    mobilePhone:String
    email:String
    come:String
    level:String
    industry:String
    address:String
    remark:String
    nextTime:Date
    principal:Profile
}

input CustomerInput{
    _id: ID!
    name:String
    phone:String
    mobilePhone:String
    email:String
    come:String
    level:String
    industry:String
    address:String
    remark:String
    url:String
}

type RootQuery {
    getCustomers:[Customer]
}
type RootMutation {
    updateCustomer(updateInput:CustomerInput):Customer
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);