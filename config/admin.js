const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const AdminCustomer =require('@/admin/customer/customer')
const AdminUser =require('@/admin/user/user')
const AdminProfile =require('@/admin/profile/profile')
// const AdminDeliver = require('../model/deliver')

/** @type {import('admin-bro').AdminBroOptions} */


const options = {
  resources: [
    AdminUser,
    AdminProfile,
    AdminCustomer,
  ],
};

module.exports = options;
