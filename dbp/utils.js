import { reviews, users, products } from '../helpers/fakeData';
import { User, Product, Review } from './models';

export const fillUpPostgressDb = () => {

  // force: true will drop the table if it already exists
  Product.sync({force: true}).then(() => {
    // Table created
    products.forEach(product => Product.create(product));
  });

  User.sync({force: true}).then(() => {
    // Table created
    users.forEach(user => User.create(user));
  });

  Review.sync({force: true}).then(() => {
    // Table created
    reviews.forEach(review => Review.create(review));
  });

};
