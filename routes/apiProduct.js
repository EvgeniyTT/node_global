import express from 'express';
import { productController } from '../controllers';

const apiProductRouter = express.Router();

apiProductRouter.param('id', (req, res, next, id) => {
  req.productId = id;
  next();
});

apiProductRouter.get('/', async (req, res) => {
  try {
    const products = await productController.getAllMongo();
    res.json(products);
  } catch (err) {
    console.error(`Error fetching all products: ${err}`);
    res.status(500).send(`Error fetching all products: ${err}`);
  }
});

apiProductRouter.delete('/:id', async (req, res) => {
  try {
    const removedProduct = await productController.deleteMongo(req);
    res.json(removedProduct);
  } catch (err) {
    console.error(`Error deleting a product: ${err}`);
    res.status(500).send(`Error deleting a product: ${err}`);
  }
});

export { apiProductRouter };
