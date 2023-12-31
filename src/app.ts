import express from 'express';
import productRouter from './router/product';
import ordersRoutes from './router/orders';
import loginRoutes from './router/login';

const app = express();

app.use(express.json());
app.use('/products', productRouter);
app.use('/orders', ordersRoutes);
app.use('/login', loginRoutes);

export default app;
