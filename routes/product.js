import express from 'express';
import { products } from '../helpers/fakeData';
import { reviewRouter } from './review';

const productRouter = express.Router();

productRouter.param('id', (req, res, next, id) => {
  req.productId = id;
  next();
});

productRouter.use('/:id/reviews', reviewRouter);

productRouter.get('/', (req, res) => {
  res.json(products);
});

productRouter.get('/:id', (req, res) => {
  const product = products.find(product => product.id == req.productId);
  if (product) {
    res.json(product);
  } else {
    res.status(400).send(`There is no product with id = ${req.productId}`);
  }
});

productRouter.post('/', (req, res) => {
  const product = req.body;
  product.id = products[products.length - 1].id + 1;
  products.push(product);
  res.json(product);
});

export { productRouter };
