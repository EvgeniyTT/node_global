import mongoose from 'mongoose';

const CitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
  },
  country: { type: String, required: true },
  capital: Boolean,
  location: {
    lat: Number,
    long: Number
  },
  lastModifiedDate: { type: Date },
}, { collection: 'cities' });


const cityModel = mongoose.model('City', CitySchema);

export { cityModel };
