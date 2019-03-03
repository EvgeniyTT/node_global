import { cities, users, products } from '../helpers/fakeData';
import { cityModel, userModel, productModel } from '../db/models';

export const fillUpMongoDb = () => {
  cities.forEach(cityData => {
    const city = cityModel({
      ...cityData,
      lastModifiedDate: new Date(),
    });
    city.save();
  });

  products.forEach(productData => {
    const product = productModel({
      ...productData,
      lastModifiedDate: new Date(),
    });
    product.save();
  });

  users.forEach(userData => {
    const user = userModel({
      ...userData,
      lastModifiedDate: new Date(),
    });
    user.save();
  });
};
