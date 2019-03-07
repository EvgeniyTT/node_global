import express from 'express';
import { userController } from '../controllers';

const apiUserRouter = express.Router();

apiUserRouter.param('id', (req, res, next, id) => {
  req.userId = id;
  next();
});

apiUserRouter.get('/', async (req, res) => {
  try {
    const users = await userController.getAllMongo();
    res.json(users);
  } catch (err) {
    console.error(`Error fetching all users: ${err}`);
    res.status(500).send(`Error fetching all users: ${err}`);
  }

});

apiUserRouter.delete('/:id', async (req, res) => {
  try {
    const removedUser = await userController.delete(req);
    res.json(removedUser);
  } catch (err) {
    console.error(`Error deleting a user: ${err}`);
    res.status(500).send(`Error deleting a user: ${err}`);
  }
});

export { apiUserRouter };
