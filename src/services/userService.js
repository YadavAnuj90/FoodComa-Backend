const { findUser, createUser } = require("../repositories/userRepository");



  

    async function registerUser(userDetails) {

        

        //It will create Brand new User in db.

        //1.we need to cheak if user with this email & Mobile number is already exixt or not:
          const user = await findUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber
          });

          if(user) {
            throw {reasion: "User with given email & mobile already exixt" , statusCode: 400}
          }


        //2.If not then create the user in db

      const newUser  =await createUser({
        email:userDetails.email,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber

      })

      if(!newUser){
        throw {reasion: "Something went wrong ,cannot create user", statusCode:500}
      }

        // 3.Return the details of created user:
        return newUser



    }


module.exports = {
  registerUser
};