import express from 'express';
import { users } from '../helpers/fakeData';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.json(users);
});

export { userRouter };
