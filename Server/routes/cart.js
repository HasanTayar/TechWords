

const express = require("express");
const controllers = require("../controllers/cart");

const router = express.Router();

router.get('/:userId', controllers.getCart);
router.post('/:userId/add', controllers.addProductToCart);
router.post('/:userId/remove', controllers.removeProductFromCart);
router.put('/:userId/updateQty', controllers.updateProductQuantity);
router.delete('/:userId/clear', controllers.clearCart);
router.post('/:userId/pay', controllers.processPayment);
module.exports = router;
