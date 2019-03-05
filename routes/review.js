import express from 'express';
import { Review } from '../dbp/models/review';


const reviewRouter = express.Router();

reviewRouter.get('/', (req, res) => {
  try {
    const review = Review.findAll({ where: { product_id: parseInt(req.productId) } });
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
