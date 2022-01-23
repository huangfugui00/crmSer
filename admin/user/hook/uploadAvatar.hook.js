const path = require('path');
const fs = require('fs');
const AdminBro = require('admin-bro');
const config = require('../../../config/config')

/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response, request, context) => {
  const { record } = context;
  const uploadAvatar =  request.payload.uploadAvatar;

  if (record.isValid() && uploadAvatar) {
    const filePath = path.join(config.DIR.avatar, record.id().toString(), uploadAvatar.name).replace(/\\/g,'/');
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    var readStream=fs.createReadStream(uploadAvatar.path);
    var writeStream=fs.createWriteStream(filePath);
    readStream.pipe(writeStream);

    if(record.params.avatar  !== undefined) {
      const oldThumb = path.join( process.cwd() ,record.params.avatar) 
      await fs.promises.unlink(oldThumb)
        .catch((err)=>{
          console.log(err);
        })
    }
  
    await record.update({ avatar: `/${filePath}` });
  }
  return response;
};


module.exports = { after };
