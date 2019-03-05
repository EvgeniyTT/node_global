import Sequelize from 'sequelize';
import sequelize from '../connect';
import { products } from '../../helpers/fakeData';

const Product = sequelize.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
Product.sync({force: true}).then(() => {
  // Table created
  products.forEach(product => Product.create(product));
});

export { Product };