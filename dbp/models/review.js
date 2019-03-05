import Sequelize from 'sequelize';
import sequelize from '../connect';
import { Product } from './product';
import { views } from '../../helpers/fakeData';

const View = sequelize.define('View', {
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
    references: {
      model: Product,
      key: 'id',
    }
  },
});

// force: true will drop the table if it already exists
View.sync({force: true}).then(() => {
  // Table created
  views.forEach(view => View.create(view));
});

export { View };