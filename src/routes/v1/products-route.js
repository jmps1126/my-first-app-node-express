const express = require('express');
const productsController = require('./../../controllers/v1/products-controller');

const router = express.Router();

router.get('/get-all', productsController.getProducts);
router.get('/get-by-user/:userId', productsController.getProductByUser);
router.post('/create', productsController.createProduct);
router.put('/update', productsController.updateProduct);
router.delete('/delete', productsController.deleteProduc);

module.exports = router;