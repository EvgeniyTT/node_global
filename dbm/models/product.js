import mongoose from 'mongoose';

const ReviewSchema = mongoose.Schema({
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
});

const ProductSchema = mongoose.Schema({
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
  reviews: [ReviewSchema],
  lastModifiedDate: { type: Date },
}, { collection: 'products' });


const productModel = mongoose.model('Product', ProductSchema);

export { productModel };
