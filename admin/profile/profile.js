const AdminBro = require('admin-bro');
const Profile = require('@/model/profile')


const options = {
    properties:{
        createdAt:{
            isVisible: { list: false, filter: false, show: true, edit: false },
        },
        updatedAt:{
            isVisible: { list: false, filter: false, show: true, edit: false },
        }
    }
};


module.exports = {
    options,
    resource: Profile,
};