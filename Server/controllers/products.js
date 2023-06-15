const Products = require('../Models/products');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get products by type
exports.getProductsByType = async (req, res) => {
  const { type } = req.params;
  try {
    const products = await Products.find({ type });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Products(req.body);
    const product = await newProduct.save();
    if (!product) throw Error('Could not save the new product!');
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    let product = await Products.findById(req.params.id);
    if (!product) throw Error('Product not found');
    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    let product = await Products.findByIdAndDelete(req.params.id);
    if (!product) throw Error('No product found');
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
