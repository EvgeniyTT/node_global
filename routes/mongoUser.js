import express from 'express';
import { userModel } from '../dbm/models';

const mongoUserRouter = express.Router();

mongoUserRouter.param('id', (req, res, next, id) => {
  req.userId = id;
  next();
});

mongoUserRouter.get('/', async (req, res) => {
  const users = await userModel.find({});
  res.json(users);
});

mongoUserRouter.delete('/:id', async (req, res) => {
  try {
    const removedUser = await userModel.findOneAndDelete({ _id: req.userId });
    console.log('removedUser: ', removedUser);
    res.json(removedUser);
  } catch (err) {
    console.error(`Error deleting a user: ${err}`);
    res.status(500).send(`Error deleting a user: ${err}`);
  }
});

export { mongoUserRouter };
