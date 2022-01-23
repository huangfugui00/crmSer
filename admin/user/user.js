const AdminBro = require('admin-bro');
const User = require('@/model/user')
const {before:passwordBeforeHook} = require('./hook/password.hook')
const {after:uploadAvatarAfterHook} = require('./hook/uploadAvatar.hook')

const options = {
    properties:{
        password: {
            type: 'password',
        },
        hashPassword:{
            isVisible: false,
        },
        createdAt:{
            isVisible: { list: false, filter: false, show: true, edit: false },
        },
        updatedAt:{
            isVisible: { list: false, filter: false, show: true, edit: false },
        }
    },
    actions:{
        new: {
            before: async (request) => {
                return  passwordBeforeHook(request);
            },
            after: async (res,req,context) => {
                return uploadAvatarAfterHook(res,req,context);
            }
          },
        edit:{
            before: async (request) => {
                return  passwordBeforeHook(request);
            },
            after: async (res,req,context) => {
                return uploadAvatarAfterHook(res,req,context);
            }
        }
    }
    
};


module.exports = {
    options,
    resource: User,
};