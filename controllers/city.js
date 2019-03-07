import { cityModel } from '../dbm/models';

const transforReqToCity = req => ({
  name: req.body.name,
  country: req.body.country,
  capital: req.body.capital,
  location: {
    lat: req.body.location.lat,
    long: req.body.location.long
  },
  lastModifiedDate: new Date(),
});

export const cityController = {
  getAll: () => cityModel.find({}),
  save: req => {
    const city = cityModel(transforReqToCity(req));
    return city.save();
  },
  update: req => {
    const city = cityModel(transforReqToCity(req));
    return cityModel.findOneAndUpdate(
      { _id: req.cityId },
      city,
      { upsert: true, new: true }
    );
  },
  delete: req => cityModel.findOneAndDelete({ _id: req.cityId }),
};
