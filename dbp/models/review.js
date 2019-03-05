import Sequelize from 'sequelize';
import sequelize from '../connect';
import { Product } from './product';

const Review = sequelize.define('Review', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  product_id: {
    type: Sequelize.INTEGER,
    // references: {
    //   model: Product,
    //   key: 'id',
    // }
  },
});

export { Review };
