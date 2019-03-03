import express from 'express';
// import { users } from '../helpers/fakeData';
import { User } from '../dbp/models/user';

const userRouter = express.Router();

userRouter.get('/', async(req, res) => {
  const users = await User.findAll();
  res.json(users);
});

export { userRouter };
