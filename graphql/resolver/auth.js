const UserModel = require('../../model/user');
const ProfileModel = require('../../model/profile');

module.exports={
    login:async (args, req) =>{
        try{
            console.log('login')
            const user = await UserModel.findOne( {email: args.email})
            if (!user) {
              throw new Error('Email or Password is not correct')
            }
            const isMatch = await  user.matchPassword(args.password)
            if (!isMatch) {
                throw new Error('Email or Password is not correct')
            }

            const token = user.getSignedJwtToken()
            return {token};
        }
        catch(err){
            throw new Error(err)
        }
    }
    
}