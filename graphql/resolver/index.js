const authResolvers = require('./auth');
const customerResolvers = require('./customer');
const contactResolvers = require('./contact');
const contractResolvers = require('./contract');

const rootResolver = {
    ...contractResolvers,
    ...customerResolvers,
    ...contactResolvers,
    ...authResolvers,
  };
  

module.exports = rootResolver