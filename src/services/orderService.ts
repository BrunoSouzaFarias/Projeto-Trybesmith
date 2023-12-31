import OrderModel from '../database/models/order.model';
import { ServiceResponse } from '../types/ResponseService';
import { OrderResponse, OrdersServices } from '../types/Order';
import ProductModel from '../database/models/product.model';

async function getAllOrders(): Promise<ServiceResponse<OrderResponse[]>> {
  const allOrders = await OrderModel.findAll({
    include: [{
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    }],
  });
  const ordersList = allOrders.map(({ dataValues }) => ({
    id: dataValues.id,
    userId: dataValues.userId,
    productIds: dataValues.productIds?.map((product) => product.id),
  }));

  return { status: 'SUCCESSFUL', data: ordersList };
}

async function createOrder(productIds: number[], userId: number)
  : Promise<ServiceResponse<OrdersServices>> {
  const promiseProductId = productIds.map(async (_user) =>
    OrderModel.create({ userId }));

  await Promise.all(promiseProductId);

  return { 
    status: 'SUCCESSFUL',
    data: {
      userId,
      productIds,
    }, 
  };
}

export default { getAllOrders, createOrder };