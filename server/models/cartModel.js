const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = Schema({


    title:          { type: String},
    price:         { type: Number},
    img:         {type:String},
    quantity    :  {type:Number}

});

const cart= mongoose.model('cart', cartSchema);
module.exports = cart;
