const authResolvers = require('./auth');
const customerResolvers = require('./customer');
const contactResolvers = require('./contact');
const contractResolvers = require('./contract');
const refundResolvers = require('./refund');

const rootResolver = {
    ...contractResolvers,
    ...customerResolvers,
    ...contactResolvers,
    ...authResolvers,
    ...refundResolvers,
  };
  

module.exports = rootResolver