import { NextFunction, Request, Response } from 'express';
import UserModel from '../database/models/user.model';

const validateUserId = async (req: Request, res: Response, next: NextFunction):
Promise<Response<any, Record<string, any>> | undefined> => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: '"userId" is required' });
  }

  if (typeof userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }

  const findUser = await UserModel.findByPk(userId);
  if (!findUser) {
    return res.status(404).json({ message: '"userId" not found' });
  }

  next();
};

const validateProductIds = (req: Request, res: Response, next: NextFunction):
Response<any, Record<string, any>> | undefined => {
  const { productIds } = req.body;

  if (!productIds) {
    return res.status(400).json({ message: '"productIds" is required' });
  }

  if (!Array.isArray(productIds)) {
    return res.status(422).json({ message: '"productIds" must be an array' });
  }

  if (productIds.length === 0) {
    return res.status(422).json({ message: '"productIds" must include only numbers' });
  }
  next();
};

export default {
  validateUserId,
  validateProductIds,
};