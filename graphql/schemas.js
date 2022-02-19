const { buildSchema } = require('graphql');


module.exports = buildSchema(`
scalar Date

type User {
    _id: ID!
    username: String
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
    products:[Product]
}

input CreateContractInput{
    name:String
    copName:ID
    remark:String
    signatory:ID
    cuSignatory:ID
    price:Float
    contractType:String
    disCount:Float
    products:[ProductInput]
}

input UpdateContractInput{
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

type Auth{
    token:String
    user:User
}
type RootQuery {
    getCustomers:[Customer]
    getContacts:[Contact]
    getContracts:[Contract]
}
type RootMutation {
    createCustomer(createInput:CreateCustomerInput):Customer
    updateCustomer(updateInput:CustomerInput):Customer
    deleteCustomer(_id:ID!):Customer
    createContact(createInput:CreateContactInput):Contact
    updateContact(updateInput:UpdateContactInput):Contact
    deleteContact(_id:ID!):Contact
    createContract(createInput:CreateContractInput):Contract
    login(email: String!, password: String!): Auth

}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);