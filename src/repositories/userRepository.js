  
  const User = require('../schema/userSchema');
  const BadRequestError = require('../utils/badRequestError');
  const InternalServerError = require('../utils/internalServerError');


  
    async function findUser(parameters) {

     try {
        
        
        const response = await User.findOne({...parameters});
        return response;
     } catch (error) {
        
        console.log(error);
        
     }

    }

    async function createUser(userDetails) {

     try {
        
        const response =  await User.create(userDetails);
        return response;

     } catch (error) {
        if(error.name === 'ValidationError') {
         const errorMessageList = Object.keys(error.errors).map((prooerty) => {
               return error.errors[prooerty].message;
         });
         console.log(error);
         throw new BadRequestError(errorMessageList);
         
        }
        throw new InternalServerError();
        
     }

    }
  

  module.exports  = {
     findUser,
     createUser
  }