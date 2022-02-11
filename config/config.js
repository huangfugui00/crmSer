const path = require('path');
const static='./static'

module.exports = {
    DIR : {
      thumb: `${static}/thumb`,
      imgs: `${static}/imgs`,
      avatar:`${static}/avatar`,
    },
    SQL : {
      // url: "mongodb://localhost:27017/crm"
        url:"mongodb+srv://admin:syqr27..@cluster0.tj20q.mongodb.net/test?retryWrites=true&w=majority"
    },
    JWT : {
      secret:"mxhdxdsn12mxs9",
      expire_day:1
    }
  };