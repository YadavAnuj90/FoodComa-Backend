const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true,"First Name is required.!"],
        minlength: [4 , "First name must be atleast 4 charector long"],
        lowercase: true,
        trim: true,  //if the user gives extra spaces then it will autimatically remove it
        maxlength: [12, "first name should me less than or equal to 12 charecter"],
    },
    lastName: {
        type: String,
        minlength: [4 , "last name must be atleast 4 charector long"],
        lowercase: true,
        trim: true,  //if the user gives extra spaces then it will autimatically remove it
        maxlength: [12, "last name should me less than or equal to 12 charecter"],
    },
    mobileNumber : {
        trim:true,
        maxlength:[10, "phone number should be lenght 10"],
        minlength:[10, "phone ny=umber should be length 10"],
        type:String,
        unique: [true , "Phone number already in use!"],
        required: [true , "Phone number should be provided"],


    },
    email: {
        type: String,
        trim: true,
        required : [true, "Email should be provided"],
        unique: [true, "Email is already in use"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true,"Password should be provided"],
        minlength:[7,"Password should be minimum 7 charecter long"],

    },
    role: {
        type: String,
        enum: ["USER","ADMIN"],
        default: "USER"
    }
        
    
}, {
    timestamps: true
});


userSchema.pre('save' , async function() {
    // here u can modify your user before it saved in mongodb..

    const hashedPassword = await  bcrypt.hash(this.password , 10);
    this.password = hashedPassword;
    
})

const User = mongoose.model("User" , userSchema); //collection

module.exports = User;

