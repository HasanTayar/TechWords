const mongoose = require('mongoose');

const CartShecma = new mongoose.Schema({
    products:{type:[String]},
    paid:{type:Boolean},
    totalPrice:{type:Number},
    userEmail:{
        type:String,
    ref:'Users'
},
qty:{type:Number}
})
const Cart= mongoose.model('Cart' , CartShecma);
module.exports = Cart;