const {createProduct} = require('../services/productService')

async function addProduct (req,res) {
    // console.log(req.file);
    // const result = await cloudinary.uploader.upload(req.file.path);
    // console.log("result" , result);
    // await fs.unlink(req.file.path);
    // res.json({message: "Ok"});
    try {
        const product = await createProduct({
            productName: req.body.productName,
            discricption:req.body.discricption,
            imagePath: req.file.path,
            qountity:req.body.qountity,
            price:req.body.price,
            category:req.body.category,
            inStock:req.body.inStock
         
         });
         return res.status(201).json({
           success:true,
           message:"Successfully created the product!",
           error:{},
           data:product
         })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            success:false,
            message:error.reasion,
            data:{},
            error:error
        });
        
    }


}

module.exports = {
    addProduct
}