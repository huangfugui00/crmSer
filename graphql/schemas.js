const { buildSchema } = require('graphql');


module.exports = buildSchema(`
scalar Date

type User {
    _id: ID!
    name: String
    email:String
    roles:[String]
}
type Profile {
  _id: ID!
  phone: String
  userId: User
  leader: User
}


type Contact {
    _id: ID!
    name:String
    copName:Customer
    jobTitle:String
    gender:String
    phone:String
    mobilePhone:String
    email:String
    address:String
    remark:String
    nextTime:Date
    principal:User
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


input CreateContactInput{
    name:String
    copName:ID
    jobTitle:String
    gender:String
    phone:String
    mobilePhone:String
    email:String
    address:String
    remark:String
}

   

input UpdateContactInput{
    _id: ID!
    name:String
    copName:ID
    jobTitle:String
    gender:String
    phone:String
    mobilePhone:String
    email:String
    address:String
    remark:String
}

type Product{
    _id:ID!
    product:String
    price:Float
    remark:String
}

input ProductInput{
    product:String
    price:Float
    remark:String
}



type Contract{
     _id: ID!
    name:String
    copName:Customer
    remark:String
    signatory:User
    cuSignatory:Contact
    price:Float
    contractType:String
    disCount:Float
    paid:Float
    unPaid:Float
    products:[Product]
}

input CreateContractInput{
    name:String
    copName:ID
    remark:String
    cuSignatory:ID
    contractType:String
    disCount:Float
    products:[ProductInput]
}

input UpdateContractInput{
    _id: ID!
    name:String
    copName:ID
    remark:String
    cuSignatory:ID
    contractType:String
    disCount:Float
    products:[ProductInput]
}

type Refund{
    _id: ID!
    copName:Customer
    contract:Contract
    principal:User
    refundPrice:Float
    refundDate:Date
    refundType:String
    remark:String
    contractPrice:Float
}

input CreateRefundInput{
    copName:ID!
    contract:ID!
    principal:ID
    refundPrice:Float
    refundDate:Date
    refundType:String
    remark:String
}

input UpdateRefundInput{
    _id:ID!
    principal:ID
    refundPrice:Float
    refundDate:Date
    refundType:String
    remark:String
}

type Auth{
    token:String
    user:User
}
type RootQuery {
    getCustomers:[Customer]
    getContacts:[Contact]
    getContracts:[Contract]
    getRefunds:[Refund]
}
type RootMutation {
    createCustomer(createInput:CreateCustomerInput):Customer
    updateCustomer(updateInput:CustomerInput):Customer
    deleteCustomer(_id:ID!):Customer
    createContact(createInput:CreateContactInput):Contact
    updateContact(updateInput:UpdateContactInput):Contact
    deleteContact(_id:ID!):Contact
    createContract(createInput:CreateContractInput):Contract
    updateContract(updateInput:UpdateContractInput):Contract
    deleteContract(_id:ID!):Contract
    createRefund(createInput:CreateRefundInput):Refund
    updateRefund(updateInput:UpdateRefundInput):Refund
    deleteRefund(_id:ID!):Refund
    login(email: String!, password: String!): Auth
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);