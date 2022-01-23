const bcrypt = require('bcryptjs')
const AdminBro = require('admin-bro');


/** @type {AdminBro.Before} */
const before = async (request) => {
  if (request.method === 'post') {
    const { password, ...otherParams } = request.payload;

    if (password) {
      const hashPassword= bcrypt.hashSync(password, 10);

      return {
        ...request,
        payload: {
          ...otherParams,
          hashPassword,
        },
      };
    }
  }
  return request;
};

module.exports = { before };
