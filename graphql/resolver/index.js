const customerResolvers = require('./customer');

const rootResolver = {
    ...customerResolvers,
  };
  

module.exports = rootResolver