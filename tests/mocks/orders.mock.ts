import OrderModel from "../../src/database/models/order.model";
import ProductModel from "../../src/database/models/product.model";
import { Order, OrderResponse, OrdersServices } from "../../src/types/Order";

const ordersDataOrder: Order[] = [
  {
    id: 1,
    userId: 2,
    productIds: [
      { id:1 },
      { id:2 }
    ],
  },
  {
    id: 2,
    userId: 1,
    productIds: [
      { id:3 },
      { id:4 }
    ]
  }
];

const ordersDataResponse: OrderResponse[] = [
  {
    id: 1,
    userId: 2,
    productIds: [1, 2]
  },
  {
    id: 2,
    userId: 1,
    productIds: [3, 4]
  }
];

const ordersModelMock = OrderModel.bulkBuild(ordersDataOrder, {
  include: {
    model: ProductModel,
    as: 'productIds',
    attributes: ['id'],
  }
});

const ordersCreateModel: OrdersServices = {
  productIds: [1, 2],
  userId: 1
}

export default {
  ordersModelMock,
  ordersDataOrder,
  ordersDataResponse,
  ordersCreateModel
}