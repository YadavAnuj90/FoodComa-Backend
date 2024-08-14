
const express = require('express');
const { login } = require('../controllers/authController');

 const authRouter = express.Router();

 authRouter.post('/login' , login); //this is registration route

 module.exports = authRouter;  //exporting router