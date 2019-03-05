import Sequelize from 'sequelize';
import sequelize from '../connect';
import { users } from '../../helpers/fakeData';

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

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // Table created
  users.forEach(user => User.create(user));
});

export { User };
