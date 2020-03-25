import {Application} from 'express';
import productsRoute from './products-route';
import userRoute from './users-route';

export default (app: Application): void => {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/products', productsRoute);
};
