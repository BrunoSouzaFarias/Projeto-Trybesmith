import ProductModel,
{ ProductInputtableTypes,
  ProductSequelizeModel } 
  from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ResponseService';

async function createProduct(product: ProductInputtableTypes): Promise<ServiceResponse<Product>> {
  const newProduct = await ProductModel.create(product);
  return { status: 'SUCCESSFUL', data: newProduct.dataValues };
}

async function getAllProducts(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const allProducts = await ProductModel.findAll();
  return { status: 'SUCCESSFUL', data: allProducts };
}

export default {
  createProduct,
  getAllProducts,
};