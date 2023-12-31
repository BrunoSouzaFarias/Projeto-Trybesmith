import { NextFunction, Request, Response } from 'express';

export const productValidate = (req: Request, res: Response, next: NextFunction) => {
  const { name, price, orderId } = req.body;
  if (!name || !price || !orderId) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

export const loginValidate = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  }
  next();
};

export default {
  productValidate,
  loginValidate,
};
