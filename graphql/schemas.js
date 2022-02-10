const { buildSchema } = require('graphql');


module.exports = buildSchema(`
scalar Date

type User {
    _id: ID!
    username: String
    email:String
}
type Profile {
  _id: ID!
  phone: String
  userId: User
  leader: User
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
    principal:User
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

input CreateCustomerInput{
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

type Token{
    token:String
}
type RootQuery {
    getCustomers:[Customer]
}
type RootMutation {
    createCustomer(createInput:CreateCustomerInput):Customer
    updateCustomer(updateInput:CustomerInput):Customer
    deleteCustomer(_id:ID!):Customer
    login(email: String!, password: String!): Token

}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);