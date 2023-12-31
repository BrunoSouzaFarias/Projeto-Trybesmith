import productsMock from '../../mocks/product.mock';
import productsService from '../../../src/services/productService';
import productsController from '../../../src/controllers/productController';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import chai, { expect } from 'chai'; // Importe o 'expect' do Chai
chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  let res = {} as Response;

  beforeEach(function () {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;
    sinon.restore();
  });

  it('Cadastrar produtos retornando SUCCESSFUL: Controller', async () => {
    req.body = productsMock.productInput;

    sinon.stub(productsService, 'createProduct').resolves({ status: 'SUCCESSFUL', data: productsMock.productModelMock.dataValues });

    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productsMock.productModelMock.dataValues);
  });

  it('Cadastrar produtos retornando ERRO: Controller', async () => {
    req.body = productsMock.productInput;

    sinon.stub(productsService, 'createProduct').resolves({ status: 'BAD_REQUEST', data: { message: 'Erro' } });

    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: 'Erro' });
  });

  it('Listar produtos com SUCCESSFUL: Controller', async () => {
    sinon.stub(productsService, 'getAllProducts').resolves({ status: 'SUCCESSFUL', data: [productsMock.productModelMock] });

    await productsController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([productsMock.productModelMock]);
  });
});
