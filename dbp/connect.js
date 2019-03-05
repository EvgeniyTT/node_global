import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:postgres@postgres:5432/postgres');

export const connectToPostgresDb = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}


export default sequelize;
