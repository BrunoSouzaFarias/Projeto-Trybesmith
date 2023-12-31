import sinon, { SinonStubbedInstance } from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ordersService from '../../../src/services/orderService';
import ordersController from '../../../src/controllers/ordersController';
import ordersMock from '../../mocks/orders.mock';
import chai from 'chai';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  let res: SinonStubbedInstance<Response>;

  beforeEach(function () {
    res = {
      status: sinon.stub(),
      json: sinon.stub(),
    } as unknown as SinonStubbedInstance<Response>;
    sinon.restore();
  });

  it('Listar todos os pedidos com SUCCESSFUL: Controller', async () => {
    sinon.stub(ordersService, 'getAllOrders').resolves({
      status: 'SUCCESSFUL',
      data: ordersMock.ordersDataResponse,
    });

    await ordersController.getAllOrders(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, ordersMock.ordersDataResponse);
  });

  it('Criar pedidos com SUCCESSFUL: Controller', async () => {
    sinon.stub(ordersService, 'createOrder').resolves({
      status: 'SUCCESSFUL',
      data: ordersMock.ordersCreateModel,
    });
    req.body = {
      productIds: [1, 2],
      userId: 1,
    };

    await ordersController.createOrder(req, res);

    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.json, ordersMock.ordersCreateModel);
  });
});
