import { Request, Response } from 'express';
import productsService from '../services/productService';
import mapStatusHTTP from '../Utils/statusHTTP';

async function createProduct(req: Request, res: Response): Promise<Response> {
  const { name, price, orderId } = req.body;
  const serviceResponse = await productsService.createProduct({ name, price, orderId });

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  return res.status(201).json(serviceResponse.data);
}

async function getAllProducts(_req: Request, res: Response): Promise<Response> {
  const serviceResponse = await productsService.getAllProducts();
  return res.status(200).json(serviceResponse.data);
}

export default { 
  createProduct,
  getAllProducts,
};