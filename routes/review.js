import express from 'express';
import { reviewController } from '../controllers';

const reviewRouter = express.Router();

reviewRouter.get('/', async(req, res) => {
  try {
    const review = await reviewController.getAll(req);
    if (review) {
      res.json(review);
    } else {
      res.status(400).send(`There is no reviews for the product with id = ${req.productId}`);
    } 
  } catch (err) {
    console.error(`Error fetching reviews: ${err}`);
    res.status(500).send(`Error fetching reviews: ${err}`);
  }
});

export { reviewRouter };
