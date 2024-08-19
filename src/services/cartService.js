const { getCartByUserId, clearCart } = require("../repositories/cartRepository");
const { getProductById } = require("../repositories/productRepo");
const NotFoundError = require("../utils/notFoundError");
const BadRequestError = require("../utils/badRequestError");
const AppError = require("../utils/appError");


async function getCart(userId) {
    const Cart = await getCartByUserId(userId);
    if(!Cart) {
         throw new NotFoundError('Cart');
    }
    return Cart;
}
async function modifyCart(userId , productId ,shouldAdd = true ) {
    const quantityValue = (shouldAdd == true) ? 1 : -1;
    const cart = await getCart(userId);
    const product = await getProductById(productId);
    if(!product) {
        throw new NotFoundError('Product');
    }
     if(!product.inStock && product.qountity <= 0) {
        throw new BadRequestError(["Product not available in staock!"]);
     }
     //May be the product is already in the cart

     let foundProduct = false;
     cart.items.forEach(item => {
        if(item.product._id  == productId) {
           if(shouldAdd) {
            if(product.qountity >= item.quantity + 1)
                item.quantity += quantityValue;
            else 
            throw new AppError("Requested quantity is not avaialbe" , 404);
           }else {
            if(item.quantity > 0) {
                item.quantity += quantityValue;
                if(item.quantity == 0) {
                    cart.items = cart.items.filter(item => item.product._id != productId);
                    foundProduct = true;
                    return;
                }

            }
             
            else 
                  throw new AppError("Requested quantity is not avaialbe" , 404);
           }
       
            foundProduct = true;
        }
     });
     if(!foundProduct) {
        if(shouldAdd) {
           
            cart.items.push({
                product: productId,
                quantity : 1
            })
        } else {
            throw new NotFoundError("Product in cart");
        }
      
     }
   await cart.save();

   return cart;

}

 async function clearProductsCart(userId) {
    const response = await clearCart(userId);
    return response;
    
 }

module.exports = {
    getCart,
    modifyCart,
    clearProductsCart
}