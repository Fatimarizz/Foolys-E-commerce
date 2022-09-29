const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config({path:'../config.env'})
const userSchema = Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirm_password: { type: String, required: true },
    tokens: [
        {token:
            {
                type: String,
                required: true
            }
        }
    ]


});

//we are hashing the password
//it is type of middleware 

// save sy phely call ho ga to usky pas sary properties h usmy sy agar 
// password ko modified kru
userSchema.pre('save', async function (next) {
  
    if (this.isModified('password')) {
        console.log(this.password, "password");
        this.password = await bcrypt.hash(this.password, 10);// whatever current password hash
        console.log(this.password, "hashed password");
        this.confirm_password = await bcrypt.hash(this.confirm_password, 10);
    }
    next(); //isy next line auth.js ma save() ka method call ho ga

   

});
 // jwt token generating 
 userSchema.methods.generateAuthToken = async function(){
    try {
        let mytoken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:mytoken})
        await this.save();
        return mytoken;
    }
    catch (err) {
        console.log(err);
    }
}
//save sy phely passwod ko hash krna
const User = mongoose.model('user', userSchema);
module.exports = User
