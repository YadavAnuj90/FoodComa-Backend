const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const UnAuthorisedError = require('../utils/unauthorisedError');

async function isLoggedIn(req ,res,next) {
    const token  = req.cookies["authToken"];
    if(!token) {
        return res.status(401).json({
            success:false,
            data: {},
            error: "Not authenticated",
            message: "No Auth Token provided.!"
        });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(!decoded) {
            throw new UnAuthorisedError();
        }
         
    req.user = {
        email:decoded.email,
        id:decoded.id,
        role: decoded.role
    }
    next();

    } catch (error) {

        return res.status(401).json({
            success:false,
            data: {},
            error: error,
            message: "Invalid Token provided"
        });
    }  
  
}
/**
 * This function cheaks if the authenticated user is an admin or not ?
 * Beacuse we will call isAdmin after isLoggedIn thats why we will recive user details
 */

 function isAdmin(req,res,next) {
    const loggedInUser = req.user;
    if(loggedInUser.role === "ADMIN") {
        next();
    }else {
        return res.status(401).json({
            success: false,
            data: {},
            message: "You are not authorised for this action!",
            error: {
                statusCode: 401,
                reasion: "Unauthorised user for this action"
            }
        })
    }
    
  }

module.exports = {
    isLoggedIn,
    isAdmin 
    
}