const Product = require('../schema/productSchema');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails){
    try {
        const response = await Product.create(productDetails);
        return response;
    } catch (error) {
          if(error.name === 'ValidationError') {
             
       const errorMessageList =  Object.keys(error.errors).map((property) => {
            return error.errors[property].message;
            
        });
            throw new BadRequestError(errorMessageList);
        }  
        console.log(error);
        
        throw new InternalServerError();
        
    }

}

  async function getProductById(productId) {

    try {
        const product = await Product.findById(productId);
        return product;
    } catch (error) {
        console.log(error);
        throw new NotFoundError('Product');
        
    }
  }

  async function deleteProductById(productId) {
    try {
          const response = Product.findByIdAndDelete(productId);
          return response;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
        
    }
  }

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}