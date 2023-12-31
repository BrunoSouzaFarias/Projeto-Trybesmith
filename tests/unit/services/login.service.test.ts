import { expect } from 'chai';
import bcrypt from 'bcryptjs'
import sinon from 'sinon';
import loginMock from '../../mocks/login.mock';
import loginService from '../../../src/services/loginService'
import UserModel from '../../../src/database/models/user.model';
describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Não receber um username, retorne um erro', async function () {
    const parameters = loginMock.noUsernameLoginBody;

    const serviceResponse = await loginService.createUser(parameters);

    expect(serviceResponse.status).to.eq('BAD_REQUEST');
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.deep.eq({ message: '"username" and "password" are required' });  
  });

  it('Não receber um password, retorne um erro', async function () {
    const parameters = loginMock.noPasswordLoginBody;

    const serviceResponse = await loginService.createUser(parameters);

    expect(serviceResponse.status).to.eq('BAD_REQUEST');
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.deep.eq({ message: '"username" and "password" are required' });  
  });

  it('Receber um username inexistente, retorne um erro', async function () {
    const parameters = loginMock.notExistingUserBody;
    sinon.stub(UserModel, 'findOne').resolves(null);

    const serviceResponse = await loginService.createUser(parameters);

    expect(serviceResponse.status).to.eq('UNAUTHORIZED');
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.deep.eq({ message: 'Username or password invalid' });  
  });

  it('Receber um username existente e uma password errada, retorne um erro', async function () {
    const parameters = loginMock.existingUserWithWrongPasswordBody;
    const mockFindOneReturn = UserModel.build(loginMock.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

    const serviceResponse = await loginService.createUser(parameters);

    expect(serviceResponse.status).to.eq('UNAUTHORIZED');
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.deep.eq({ message: 'Username or password invalid' });
  });

  it('Receber um username e uma password válida, retorne um token de login', async function () {
    const parameters = loginMock.validLoginBody;
    const mockFindOneReturn = UserModel.build(loginMock.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);
    sinon.stub(bcrypt, 'compareSync').resolves(true);
    const serviceResponse = await loginService.createUser(parameters);

    expect(serviceResponse.status).to.eq('SUCCESSFUL');
    expect(serviceResponse.data).to.have.key('token');
  });
});