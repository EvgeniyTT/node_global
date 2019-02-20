import express from 'express';
import { users } from './fakeData';
import { makeToken } from '../utils/jwt';

const authRouter = express.Router();

authRouter.post('/', (req, res) => {
  const { login, pass } = req.body;
  const user = users.find(v => v.login === login && v.pass === pass);

  if (user) {
    res.setHeader('token', makeToken({ login, id: user.id }));
    res.json(user);
  } else {
    res.status(404).json({ message: 'Can not find a user with such username and password' });
  }
});

export { authRouter };
