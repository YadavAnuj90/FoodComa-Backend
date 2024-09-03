const express = require ("express");
const cors  = require("cors");
const cookieParser = require('cookie-parser');
const ServerConfig = require('./config/serverConfig');
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const authRouter = require("./routes/authRoute");
const cloudinary  = require("./config/cloudinaryConfig");
const uploader = require("./middlewares/multerMiddleware");
const fs = require('fs/promises');
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");

const app = express();

app.use(cors( {
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));


app.use('/users' , userRouter);
app.use('/carts' , cartRouter);
app.use('/auth' , authRouter);
app.use('/products' , productRouter);
app.use('/orders' , orderRouter);


app.get('/ping', (req, res) => {
    // controller
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message: "pong"});
});


app.post('/photo' , uploader.single('catImg'),async (req,res) =>{
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("result" , result);
    await fs.unlink(req.file.path);
    res.json({message: "Ok"});
})

app.listen(ServerConfig.PORT, async () => {

   await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}`);
  

    
})