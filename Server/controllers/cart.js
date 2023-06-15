// Import your models
const Cart = require("../Models/cart");
const Products = require('../Models/products');

// Get a user's cart
exports.getCart = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const cart = await Cart.findOne({ userEmail: userId }).populate('products.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    return res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Add a product to a user's cart
exports.addProductToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ userEmail: userId });
    const product = await Products.findById(productId);

    // If either the cart or the product doesn't exist, return an error
    if (!cart || !product) {
      return res.status(404).json({ message: 'Cart or product not found' });
    }

    // If the product is already in the cart, just increment the quantity
    const existingProduct = cart.products.find(p => p.product._id === productId);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      // Otherwise, add the new product to the cart
      cart.products.push({ product: product._id, quantity: 1 });
    }

    cart.totalPrice += product.price;
    await cart.save();

    return res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Remove a product from a user's cart
exports.removeProductFromCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ userEmail: userId });
    const productIndex = cart.products.findIndex(p => p.product._id === productId);

    // If the product is not in the cart, return an error
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    const product = cart.products[productIndex];
    cart.totalPrice -= product.quantity * product.product.price;
    cart.products.splice(productIndex, 1);

    await cart.save();

    return res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update the quantity of a product in a user's cart
exports.updateProductQuantity = async (req, res) => {
  const { userId } = req.params;
  const { productId, change } = req.body;

  try {
    const cart = await Cart.findOne({ userEmail: userId });
    const product = cart.products.find(p => p.product._id === productId);

    // If the product is not in the cart, return an error
    if (!product) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    product.quantity += change;
    cart.totalPrice += change * product.product.price;

    await cart.save();

    return res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Clear a user's cart
exports.clearCart = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const cart = await Cart.findOne({ userEmail: userId });
    cart.products = [];
    cart.totalPrice = 0;

    await cart.save();

    return res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Process a payment
exports.processPayment = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const cart = await Cart.findOne({ userEmail: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    if (cart.products.length === 0) {
      return res.status(400).json({ message: 'Cannot process payment for empty cart' });
    }

    // Here you might want to actually process the payment. For now, let's just clear the cart
    cart.products = [];
    cart.totalPrice = 0;
    cart.paid = true;

    await cart.save();

    return res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
