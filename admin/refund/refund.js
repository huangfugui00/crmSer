const AdminBro = require('admin-bro');
const Refund = require('@/model/refund')

const options = {
    properties:{
        createdAt:{
            isVisible: { list: false, filter: false, show: true, edit: false },
        },
        updatedAt:{
            isVisible: { list: false, filter: false, show: true, edit: false },
        },
        contractPrice:{
            isVisible:{edit:false,show: true,list: true}
        },
        copName:{
            isVisible:{edit:false,show: true,list: true}
        },
        contract:{
            isVisible:{edit:false,show: true,list: true}
        },
    }
};


module.exports = {
    options,
    resource: Refund,
};

