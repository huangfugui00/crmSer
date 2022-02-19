const AdminBro = require('admin-bro');
const Contract = require('@/model/contract')


const options = {
    properties:{
        createdAt:{
            isVisible: { list: false, filter: false, show: true, edit: false },
        },
        updatedAt:{
            isVisible: { list: false, filter: false, show: true, edit: false },
        },
        price:{
            isVisible: { edit: false ,show:true,list:true },
        },
        paid:{
            isVisible: { edit: false ,show:true,list:true },
        },
        unPaid:{
            isVisible: { edit: false ,show:true,list:true },
        }
    }
};


module.exports = {
    options,
    resource: Contract,
};