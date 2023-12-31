import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginMock from '../../mocks/login.mock';
import loginService from '../../../src/services/loginService';
import loginController from '../../../src/controllers/loginController';
import chai, { expect } from 'chai'; // Importe o 'expect' do Chai
chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  let res = {} as Response;

  beforeEach(function () {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;
    sinon.restore();
  });

  it('Não receber um username, retorne um erro', async function () {
    req.body = loginMock.noUsernameLoginBody;

    sinon.stub(loginService, 'createUser').resolves({ status: 'BAD_REQUEST', data: { message: '"username" and "password" are required' }});

    await loginController.createUser(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"username" and "password" are required' });
  });

  it('Receber um username e uma password válida, retorne um token de login', async function () {
    req.body = loginMock.validLoginBody;

    sinon.stub(loginService, 'createUser').resolves({ status: 'SUCCESSFUL', data: { token: loginMock.resultTokenLogin } });

    await loginController.createUser(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ token: loginMock.resultTokenLogin });
  });
});
