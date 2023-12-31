import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import productsService from '../../../src/services/productService';
import productsMock from '../../mocks/product.mock';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  beforeEach(function () {
    sinon.restore();
  });
  it('Cadastrar produtos com SUCCESSFUL: Service', async () => {

    sinon.stub(ProductModel, 'create').resolves(productsMock.productModelMock);

    const productResponse = await productsService.createProduct(productsMock.productInput);

    expect(productResponse).to.deep.equal({ status: 'SUCCESSFUL', data: productsMock.productModelMock.dataValues })

  })

  it('Listar produtos com SUCCESSFUL: Service', async () => {

    sinon.stub(ProductModel, 'findAll').resolves([productsMock.productModelMock]);

    const productResponse = await productsService.getAllProducts();

    expect(productResponse).to.deep.equal({ status: 'SUCCESSFUL', data: [productsMock.productModelMock] })

  })
});