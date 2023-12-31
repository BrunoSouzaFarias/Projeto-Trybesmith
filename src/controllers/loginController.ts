import { Request, Response } from 'express';
import loginService from '../services/loginService';
import mapStatusHTTP from '../Utils/statusHTTP';

async function createUser(req: Request, res: Response): Promise<Response> {
  const serviceResponse = await loginService.createUser(req.body);

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  return res.status(200).json(serviceResponse.data);
}

export default {
  createUser,
};