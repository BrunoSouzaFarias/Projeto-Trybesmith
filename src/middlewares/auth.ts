import { NextFunction, Request, Response } from 'express';
import jwtUtil from '../Utils/createToken';
import UserModel from '../database/models/user.model';

/* Função para extrair o token */
function extractToken(authorization: string): string {
  return authorization.split(' ')[1];
}

async function authMiddleware(req: Request, res: Response, next: NextFunction):
Promise<Response<any, Record<string, any>> | undefined> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = extractToken(authorization);

  try {
    const decoded = await jwtUtil.verify(token);
    const user = await UserModel.findOne({ where: { username: decoded.username } });
    if (!user) return res.status(401).json({ message: 'Invalid token' }); 

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export default authMiddleware;