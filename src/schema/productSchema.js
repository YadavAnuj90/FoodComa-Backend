const mongoose = require('mongoose');
 
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required:[true, "Product Name is required:"],
        minlength: [4, "Product name atleast 4 charecter!"],
        trim:true

    },
    discricption: {
        type:String,
        minlength:[5 , "Product discription must be 5 charecter Long"],
    },
    productImage: {
        type:String,

    },
    qountity: {
        type:Number,
        required:true,
        default:10
    },
    price: {
        type: Number,
        required:[true , "Product prize is required "]
    },
    category: {
        type: String ,
        enum: ['veg','nom veg','drinks', 'sides'],
        default: 'veg'
    },
    inStock: {
        type: Boolean,
        required: [true, "In stock status required "],
        default: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model('profuct' , productSchema);
module.exports = Product;
