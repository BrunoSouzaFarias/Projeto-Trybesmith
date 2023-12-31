import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ResponseService';
import { Login } from '../types/Login';
import jwtUtils from '../Utils/createToken';

async function createUser(login: Login): Promise<ServiceResponse<{ token: string }>> {
  if (!login.username || !login.password) {
    return { status: 'BAD_REQUEST', data: { message: '"username" and "password" are required' } };
  }
  const foundUser = await UserModel.findOne({ where: { username: login.username } });

  if (!foundUser || !bcrypt.compareSync(login.password, foundUser.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }
  const { username, password } = foundUser.dataValues;
  const token = jwtUtils.sign({ username, password });
  return { status: 'SUCCESSFUL', data: { token } };
}

export default {
  createUser,
};
