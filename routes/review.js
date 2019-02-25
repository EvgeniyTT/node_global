import express from 'express';
import { products } from '../helpers/fakeData';

const reviewRouter = express.Router();

reviewRouter.get('/', (req, res) => {
  const product = products.find(product => product.id == req.productId);
  if (product) {
    res.json(product.reviews);
  } else {
    res.status(400).send(`There is no product with id = ${req.productId}`);
  }
});

export { reviewRouter };
