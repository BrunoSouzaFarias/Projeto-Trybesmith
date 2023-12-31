import { NextFunction, Request, Response } from 'express';

const validateProductName = async (req: Request, res: Response, next: NextFunction): 
Promise<Response<any, Record<string, any>> | undefined> => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (typeof name !== 'string') {
    return res.status(422).json({ message: '"name" must be a string' });
  }

  if (name.length < 3) {
    return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
  }
  next();
};

const validateProductPrice = async (req: Request, res: Response, next: NextFunction):
Promise<Response<any, Record<string, any>> | undefined> => {
  const { price } = req.body;

  if (!price) {
    return res.status(400).json({ message: '"price" is required' });
  }

  if (typeof price !== 'string') {
    return res.status(422).json({ message: '"price" must be a string' });
  }

  if (price.length < 3) {
    return res.status(422).json({ message: '"price" length must be at least 3 characters long' });
  }
  next();
};
export default {
  validateProductName,
  validateProductPrice,
};