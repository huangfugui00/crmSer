const authResolvers = require('./auth');
const customerResolvers = require('./customer');
const contactResolvers = require('./contact');

const rootResolver = {
    ...customerResolvers,
    ...contactResolvers,
    ...authResolvers,
  };
  

module.exports = rootResolver