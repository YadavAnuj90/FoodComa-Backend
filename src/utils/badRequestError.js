

const AppError = require("./appError");

class BadRequestError extends AppError{
    constructor(invalidParams) {
      let message = "";
      invalidParams.forEach(params => message += `${params} \n`);
      console.log(message);
      

      super(`The request has following invalid parameters \n ${invalidParams}`, 400)
}
}
module.exports= BadRequestError;