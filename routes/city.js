import express from 'express';
import { cityController } from '../controllers';

const cityRouter = express.Router();

cityRouter.param('id', (req, res, next, id) => {
  req.cityId = id;
  next();
});

cityRouter.get('/', async (req, res) => {
  try {
    const cities = await cityController.getAll();
    res.json(cities);
  } catch (err) {
    console.error(`Error adding a city: ${err}`);
    res.status(500).send(`Error addin a city: ${err}`);
  }
});

cityRouter.post('/', async (req, res) => {
  try {
    const savedCity = await cityController.save(req);
    res.send(savedCity);
  } catch (err) {
    console.error(`Error adding a city: ${err}`);
    res.status(500).send(`Error addin a city: ${err}`);
  }
});

cityRouter.put('/:id', async (req, res) => {
  try {
    const savedCity = await cityController.update(req);
    res.send(savedCity);
  } catch (err) {
    console.error(`Error updating a city: ${err}`);
    res.status(500).send(`Error updating a city: ${err}`);
  }
});

cityRouter.delete('/:id', async (req, res) => {
  try {
    const removedCity = await cityController.delete(req);
    res.json(removedCity);
  } catch (err) {
    console.error(`Error deleting a city: ${err}`);
    res.status(500).send(`Error deleting a city: ${err}`);
  }
});

export { cityRouter };
