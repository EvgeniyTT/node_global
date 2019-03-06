import express from 'express';
import { productModel } from '../dbm/models';

const mongoProductRouter = express.Router();

mongoProductRouter.param('id', (req, res, next, id) => {
  req.productId = id;
  next();
});

mongoProductRouter.get('/', async (req, res) => {
  const products = await productModel.find({});
  res.json(products);
});

mongoProductRouter.delete('/:id', async (req, res) => {
  try {
    const removedProduct = await productModel.findOneAndDelete({ _id: req.productId });
    console.log('removedProduct: ', removedProduct);
    res.json(removedProduct);
  } catch (err) {
    console.error(`Error deleting a product: ${err}`);
    res.status(500).send(`Error deleting a product: ${err}`);
  }
});

export { mongoProductRouter };
