const customerResolvers = require('./customer');
const authResolvers = require('./auth');

const rootResolver = {
    ...customerResolvers,
    ...authResolvers
  };
  

module.exports = rootResolver