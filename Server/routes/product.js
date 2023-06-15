const express = require('express');
const router = express.Router();

const controllers = require('../controllers/products');

// Get all products
router.get('/', controllers.getProducts);

// Get products by type
router.get('/type/:type', controllers.getProductsByType);

// Create product
router.post('/new', controllers.createProduct);

// Update product
router.put('/update/:id', controllers.updateProduct);

// Delete product
router.delete('/delete/:id', controllers.deleteProduct);

module.exports = router;
