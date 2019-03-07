import express from 'express';
import { userController } from '../controllers';

const userRouter = express.Router();

userRouter.get('/', async(req, res) => {
  try {
    const users = await userController.findAllPg();
    res.json(users);
  } catch(err) {
    console.error(`Error fetching all users: ${err}`);
    res.status(500).send(`Error fetching all users: ${err}`);
  }
});

export { userRouter };
