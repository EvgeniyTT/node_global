import { Review } from '../dbp/models/review';

export const reviewController = {
  getAll: req => Review.findAll({ where: { product_id: parseInt(req.productId) } }),
};
