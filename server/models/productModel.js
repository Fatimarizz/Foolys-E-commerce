const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = Schema({
    id : {type:Number},
    name:{type:String},
    image:{type:String}
})

const productSchema = Schema({


    title:          { type: String},
    price:         { type: Number},
    category:     categorySchema,
    description:   { type: String},
    img:         [ { type: String}],

});

const product= mongoose.model('product', productSchema);
module.exports = product;
