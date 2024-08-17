const cloudinary = require('../config/cloudinaryConfig');
const ProductRepository = require('../repositories/productRepo');
const fs = require('fs/promises');
async function createProduct(productDetails) {
    //1.we should cheak if an image
    const imagePath = productDetails.imagePath;
    if(imagePath) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;
            await fs.unlink(imagePath);
        } catch (error) {
            console.log(error);
            
            throw  {reasion : "Not Able to create product", statusCode: 500}

        }
      
    }

    const product = await ProductRepository.createProduct({
        ...productDetails,
        productImage: productImage
    });
     
     if(!product){
        throw  {reasion : "Not Able to create product", statusCode: 500}
     }
    return product;
}

module.exports = {
    createProduct
}