const {findUser} = require("../repositories/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET , JWT_EXPIRY} = require("../config/serverConfig");



async function  loginUser(authDetails) {
       const email = authDetails.email;
       const plainPassword = authDetails.password;

       //1. Cheak if there is a register User...with given email

       const user = await findUser({email });

       if(!user){
           throw {message: "No user found with the given email ..!" , statusCode :404 };

           //2.if the user is found we need to compare plainIncomingPassword with HashedPassword..           
       }

       const isPasswordValidated = await bcrypt.compare(plainPassword , user.password);

       if(!isPasswordValidated) {
         
        throw {message: "Invalid password , please try again" , statusCode: 401};
       }
       const userRole = user.role ? user.role : "USER";

       //if password validated create a token and return it

   const token = jwt.sign({email: user.email , id: user._id, role: userRole} , JWT_SECRET , {
      expiresIn: JWT_EXPIRY
   });
    return {token, userRole ,userData: {
        email: user.email,
        firstName: user.firstName,
    }};
}

module.exports = {
    loginUser
}