import { expect } from 'chai';
import sinon from 'sinon';
import ordersService from '../../../src/services/orderService'
import ordersMock from '../../mocks/orders.mock';
import OrderModel from '../../../src/database/models/order.model';
describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Listar todos os pedidos com SUCCESSFUL: Service', async () => {
    sinon.stub(OrderModel, 'findAll').resolves(ordersMock.ordersModelMock)
    const serviceResponse = await ordersService.getAllOrders();

    expect(serviceResponse.status).to.eq('SUCCESSFUL');
    expect(serviceResponse.data).to.deep.equal(ordersMock.ordersDataResponse);
  })

  it('Criar pedidos com SUCCESSFUL: Service', async () => {
    sinon.stub(OrderModel, 'create').resolves();
    const {productIds, userId} = ordersMock.ordersCreateModel
    const serviceResponse = await ordersService.createOrder(productIds, userId);

    expect(serviceResponse.status).to.eq('SUCCESSFUL');
    expect(serviceResponse.data).to.deep.equal(ordersMock.ordersCreateModel);
  })
});