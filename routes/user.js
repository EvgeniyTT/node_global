import express from 'express';
import { users } from './fakeData';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.json(users);
});

export { userRouter };
