import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  lastModifiedDate: { type: Date },
}, { collection: 'users' });


const userModel = mongoose.model('User', UserSchema);

export { userModel };
