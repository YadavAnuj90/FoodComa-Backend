const { getProductById, deleteProductById } = require('../repositories/productRepo');
const {createProduct, getAllProductsData} = require('../services/productService')
const AppError = require('../utils/appError');

async function addProduct (req,res) {
   
    try {
        const product = await createProduct({
            productName: req.body.productName,
            discricption:req.body.discricption,
            imagePath: req.file ?.path,
            qountity:req.body.qountity,
            price:req.body.price,
            category:req.body.category,
            inStock:req.body.inStock
         
         });
         console.log("Back to controller " , product);
         
         return res.status(201).json({
           success:true,
           message:"Successfully created the product!",
           error:{},
           data:product
         });
    } catch (error) {
        if(error instanceof AppError) {
             
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                data:{},
                error:error
            });
        }

        console.log(error); 
        return res.status(500).json({
            success:false,
            message: 'Something went worng!',
            data:{},
            error:error
        });

        
    }


}

 async function getProduct(req ,res) {
      try {
        const response = await getProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message:'Successfully feched the product',
            error: {},
            data: response
        })
      } catch (error) {
        if(error instanceof AppError) {
             
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                data:{},
                error:error
            });
        }

        console.log(error); 
        return res.status(500).json({
            success:false,
            message: 'Something went worng!',
            data:{},
            error:error
        });
      }
 }

 
 async function getProducts(req ,res) {
    try {
      const response = await getAllProductsData();
      return res.status(200).json({
          success: true,
          message:'Successfully feched the product',
          error: {},
          data: response
      })
    } catch (error) {
      if(error instanceof AppError) {
           
          return res.status(error.statusCode).json({
              success:false,
              message:error.message,
              data:{},
              error:error
          });
      }

      console.log(error); 
      return res.status(500).json({
          success:false,
          message: 'Something went worng!',
          data:{},
          error:error
      });
    }
}


 async function deleteProduct(req ,res) {
    try {
      const response = await deleteProductById(req.params.id);
      return res.status(200).json({
          success: true,
          message:'Successfully deleted the product',
          error: {},
          data: response
      })
    } catch (error) {
      if(error instanceof AppError) {
           
          return res.status(error.statusCode).json({
              success:false,
              message:error.message,
              data:{},
              error:error
          });
      }

      console.log(error); 
      return res.status(500).json({
          success:false,
          message: 'Something went worng!',
          data:{},
          error:error
      });
    }
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct,
    getProducts
}