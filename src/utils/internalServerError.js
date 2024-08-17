
const AppError = require("./appError");

class InternalServerError extends AppError{
    constructor() {
      
      super(`It's Not you ! it's our server where something went worng`, 500);
    }
}
module.exports= InternalServerError;