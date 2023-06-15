

const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  products: [{ 
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
    quantity: { type: Number, required: true }
  }],
  paid: { type: Boolean, default: false },
  totalPrice: { type: Number, default: 0 },
  userEmail: { type: String, ref: "Users" }
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
