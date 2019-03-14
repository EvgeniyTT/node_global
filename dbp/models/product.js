import Sequelize from 'sequelize';
import sequelize from '../connect';

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

export { Product };
