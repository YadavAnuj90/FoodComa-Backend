const { getCartByUserId } = require("../repositories/cartRepository");
const NotFoundError = require("../utils/notFoundError");


async function getCart(userId) {
    const Cart = await getCartByUserId(userId);
    if(!Cart) {
         throw new NotFoundError('Cart');
    }
    return Cart;
}

module.exports = {
    getCart
}