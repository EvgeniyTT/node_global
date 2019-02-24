import express from 'express';

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
  console.log('login route');
  res.json(req.user);
});

export { loginRouter };
