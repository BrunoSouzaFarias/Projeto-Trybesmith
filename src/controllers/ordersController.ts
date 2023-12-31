import { Request, Response } from 'express';
import ordersService from '../services/orderService';

async function getAllOrders(res: Response): Promise<Response> {
  const serviceResponse = await ordersService.getAllOrders();
  return res.status(200).json(serviceResponse.data);
}

async function createOrder(req: Request, res: Response): Promise<Response> {
  const { productIds, userId } = req.body;

  const serviceResponse = await ordersService.createOrder(productIds, userId);
  return res.status(201).json(serviceResponse.data);
}

export default {
  getAllOrders,
  createOrder,
};