import Mongoose from 'mongoose';
import config from '../config';
Mongoose.Promise = global.Promise;

const connectToDb = async () => {
  try {
    await Mongoose.connect(`mongodb://mongo/${config.mongoDbName}`);
    console.log('Connected to mongo!!!');
  } catch (err) {
    console.log('Could not connect to MongoDB: ', err);
  }
};

export default connectToDb;
