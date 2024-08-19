const { clearCart } = require("../repositories/cartRepository");
const { getCart, addToCart, modifyCart, clearProductsCart } = require("../services/cartService");
const AppError = require("../utils/appError");

async function getCartByUser(req,res) {
     try {
        const cart = await getCart(req.user.id);
        return res.status(200).json({
            success: true,
            messgage: "Succesfully fetched the cart",
            error: {},
            data: cart
            
        })
     } catch (error) {
        // console.log(error);
        if(error instanceof AppError ) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went worng",
            error: error,
            data: {}
        })
        
     }

}



async function modifyProductToCart(req,res) {
    try {
       const cart = await modifyCart(req.user.id , req.params.productId, req.params.operation == "add");
       return res.status(200).json({
           success: true,
           messgage: "Succesfully Added product to the cart",
           error: {},
           data: cart
           
       })
    } catch (error) {
       // console.log(error);
       if(error instanceof AppError ) {
           return res.status(error.statusCode).json({
               success: false,
               message: error.message,
               error: error,
               data: {}
           })
       }
       return res.status(500).json({
           success: false,
           message: "Something went worng",
           error: error,
           data: {}
       })
       
    }

}

 async function clearCartById(req, res) {
       
        try {
            const cart = await clearProductsCart(req.user.id);
            return res.status(200).json({
                success: true,
                messgage: "Succesfully clear all  products from the cart",
                error: {},
                data: cart
                
            })
         } catch (error) {
            // console.log(error);
            if(error instanceof AppError ) {
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                    error: error,
                    data: {}
                })
            }
            return res.status(500).json({
                success: false,
                message: "Something went worng",
                error: error,
                data: {}
            })
     
        }   
       
    }



module.exports = {
    getCartByUser,
    modifyProductToCart,
    clearCartById
}
