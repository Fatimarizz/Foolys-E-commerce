const user = require('../models/userModel')
const jwt=require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config({path:'../config.env'})

const authenticate = async (req,res,next)=>{
   
    try{
        const authHeader = req.headers['authorization'];
            const token =  authHeader.split(' ')[1];
            console.log(token)
            if (token == 'undefined' || token== ' ') {
             console.log("token is empty")
            //  res.sendStatus(401);
            //  return res.status(400).send("something");
            //  next();
            throw new Error("Token Undefined");
            }
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if (err) return res.sendStatus(403);
                // set the user to req.user to use in the next middleware
                req.user = user;
                console.log("user token")
                next();
              }
              );
    
        // const verifytoken=jwt.verify(token,process.env.SECRET_KEY)
        // const rootuser= await user.findOne({_id:verifytoken._id,"tokens.token":token}) 
        // if(!rootuser ){throw new Error('user not found')}
        //     req.token=token;
        //     req.rootuser=rootuser;
        //     req.userId=rootuser._id
        //     console.log("user token")
        // next();

    }catch(err){
        console.log(err,"errror consoled")
        res.status(500).send(" No token Provided");
    }

}
module.exports=authenticate;