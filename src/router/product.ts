import { Router } from 'express';
import productsController from '../controllers/productController';
import validateMiddleware from '../middlewares/productMiddleware';

const productsRouter = Router();

productsRouter.post(
  '/products', 
  validateMiddleware.validateProductName,
  validateMiddleware.validateProductPrice,
  productsController.createProduct,
);
productsRouter.get('/products', productsController.getAllProducts);

export default productsRouter;