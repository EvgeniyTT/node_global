import express from 'express';
import { cityModel } from '../db/models';

const cityRouter = express.Router();

cityRouter.param('id', (req, res, next, id) => {
  req.cityId = id;
  next();
});


cityRouter.get('/', async (req, res) => {
  const cities = await cityModel.find({});
  res.json(cities);
});

cityRouter.post('/', async (req, res) => {
  const city = cityModel({
    name: req.body.name,
    country: req.body.country,
    capital: req.body.capital,
    location: {
      lat: req.body.location.lat,
      long: req.body.location.long
    },
    lastModifiedDate: new Date(),
  });
  try {
    const savedCity = await city.save();
    res.send(savedCity);
  } catch (err) {
    console.error(`Error adding a city: ${err}`);
    res.status(500).send(`Error addin a city: ${err}`);
  }
});

cityRouter.put('/:id', async (req, res) => {
  const city = cityModel({
    name: req.body.name,
    country: req.body.country,
    capital: req.body.capital,
    location: {
      lat: req.body.location.lat,
      long: req.body.location.long
    },
    lastModifiedDate: new Date(),
  });
  try {
    const savedCity = await cityModel.findOneAndUpdate(
      { _id: req.cityId },
      city,
      { upsert: true, new: true }
    );
    res.send(savedCity);
  } catch (err) {
    console.error(`Error updating a city: ${err}`);
    res.status(500).send(`Error updating a city: ${err}`);
  }
});

cityRouter.delete('/:id', async (req, res) => {
  try {
    const removedCity = await cityModel.findOneAndDelete({ _id: req.cityId });
    res.json(removedCity);
  } catch (err) {
    console.error(`Error deleting a city: ${err}`);
    res.status(500).send(`Error deleting a city: ${err}`);
  }
});


export { cityRouter };
