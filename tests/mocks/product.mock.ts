import { Model } from "sequelize";
import { Product } from "../../src/types/Product";
import ProductModel, { ProductInputtableTypes } from "../../src/database/models/product.model";

const product: Product = {
  id: 6,
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
  orderId: 4, 
};

const productModelMock = ProductModel.build(product);

const productInput = {
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
  orderId: 4,
};

export default {
  product,
  productInput,
  productModelMock,
}