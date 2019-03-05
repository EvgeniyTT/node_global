import express from 'express';
import { reviewRouter } from './review';
import { Product } from '../dbp/models/product';

const productRouter = express.Router();

productRouter.param('id', (req, res, next, id) => {
  req.productId = id;
  next();
});

productRouter.use('/:id/reviews', reviewRouter);

productRouter.get('/', async(req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(`Error fetching products: ${err}`);
    res.status(500).send(`Error fetching products: ${err}`);
  }
});

productRouter.get('/:id', async(req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.productId } });
    if (product) {
      res.json(product);
    } else {
      res.status(400).send(`There is no product with id = ${req.productId}`);
    }
  } catch (err) {
    console.error(`Error fetching product with id ${req.productId}: ${err}`);
    res.status(500).send(`Error fetching product with id ${req.productId}: ${err}`);
  }
});

productRouter.post('/', async(req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    console.error(`Error adding a product ${req.body}: ${err}`);
    res.status(500).send(`Error adding a product ${req.body}: ${err}`);
  }

});

export { productRouter };
