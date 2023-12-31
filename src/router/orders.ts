import { Router } from 'express';
import ordersController from '../controllers/ordersController';
import authMiddleware from '../middlewares/auth';
import validateOrders from '../middlewares/orderMiddleware';

const ordersRouter = Router();

ordersRouter.get('/orders', ordersController.getAllOrders);
ordersRouter.post(
  '/orders',
  authMiddleware,
  validateOrders.validateProductIds,
  validateOrders.validateUserId,
  ordersController.createOrder,
);

export default ordersRouter;