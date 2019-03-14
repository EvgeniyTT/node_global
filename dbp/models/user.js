import Sequelize from 'sequelize';
import sequelize from '../connect';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  login: {
    type: Sequelize.STRING
  },
  pass: {
    type: Sequelize.STRING
  }
});

export { User };
