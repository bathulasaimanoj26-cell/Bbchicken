import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['chicken', 'mutton', 'natukodi', 'other']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isSpecialOffer: {
    type: Boolean,
    default: false
  },
  offerPrice: {
    type: Number,
    min: 0
  },
  offerValidUntil: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
productSchema.index({ name: 1, category: 1 });
productSchema.index({ isSpecialOffer: 1, isAvailable: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
