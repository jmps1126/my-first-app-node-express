import express from 'express';
import {isAdmin, isAuth, isValidHostName} from '../../middlewares/auth';
import productsController from '../../controllers/v1/products-controller';

const router = express.Router();

router.get('/get-all', productsController.getProducts);
router.get('/get-by-user/:userId', isAuth, productsController.getProductByUser);
router.post('/create', isValidHostName, productsController.createProduct);
router.put('/update', isValidHostName, productsController.updateProduct);
router.delete('/delete', isAuth, isAdmin, productsController.deleteProduc);

export default router;
