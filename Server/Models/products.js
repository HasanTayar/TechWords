const mongoose = require('mongoose');
const ProductsSchema = new mongoose.Schema({
    serialNumber:{type:String},
    title:{type:String},
    imgUrl:{type:String},
    price:{type:Number},
})
const Products = mongoose.model('Products' , ProductsSchema);
module.exports = Products;