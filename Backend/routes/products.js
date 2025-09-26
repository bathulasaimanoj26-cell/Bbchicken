import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import Product from '../models/Product.js';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, special } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (special === 'true') {
      query.isSpecialOffer = true;
      query.isAvailable = true;
      // Only include offers that are still valid
      query.$or = [
        { offerValidUntil: null },
        { offerValidUntil: { $gte: new Date() } }
      ];
    }
    
    const products = await Product.find(query).sort({ category: 1, name: 1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/products
// @desc    Create a product
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      description,
      image,
      isAvailable,
      isSpecialOffer,
      offerPrice,
      offerValidUntil
    } = req.body;

    // Check if product already exists
    let product = await Product.findOne({ name });
    
    if (product) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    // Create new product
    product = new Product({
      name,
      category,
      price,
      description,
      image: image || '',
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      isSpecialOffer: isSpecialOffer || false,
      offerPrice: isSpecialOffer && offerPrice ? offerPrice : undefined,
      offerValidUntil: isSpecialOffer && offerValidUntil ? new Date(offerValidUntil) : undefined
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      description,
      image,
      isAvailable,
      isSpecialOffer,
      offerPrice,
      offerValidUntil
    } = req.body;

    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product fields
    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price !== undefined ? price : product.price;
    product.description = description !== undefined ? description : product.description;
    product.image = image !== undefined ? image : product.image;
    product.isAvailable = isAvailable !== undefined ? isAvailable : product.isAvailable;
    product.isSpecialOffer = isSpecialOffer !== undefined ? isSpecialOffer : product.isSpecialOffer;
    
    if (isSpecialOffer) {
      product.offerPrice = offerPrice !== undefined ? offerPrice : product.offerPrice;
      product.offerValidUntil = offerValidUntil ? new Date(offerValidUntil) : product.offerValidUntil;
    } else {
      product.offerPrice = undefined;
      product.offerValidUntil = undefined;
    }

    product.updatedAt = Date.now();
    
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/products/:id/availability
// @desc    Toggle product availability
// @access  Private/Admin
router.put('/:id/availability', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    product.isAvailable = !product.isAvailable;
    await product.save();
    
    res.json({ 
      id: product._id, 
      isAvailable: product.isAvailable 
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/products/:id/special-offer
// @desc    Set special offer for a product
// @access  Private/Admin
router.put('/:id/special-offer', protect, admin, async (req, res) => {
  try {
    const { offerPrice, validUntil } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (offerPrice === undefined || !validUntil) {
      return res.status(400).json({ message: 'Offer price and valid until date are required' });
    }
    
    product.isSpecialOffer = true;
    product.offerPrice = offerPrice;
    product.offerValidUntil = new Date(validUntil);
    
    await product.save();
    
    res.json({
      id: product._id,
      isSpecialOffer: product.isSpecialOffer,
      offerPrice: product.offerPrice,
      offerValidUntil: product.offerValidUntil
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/products/:id/special-offer
// @desc    Remove special offer from a product
// @access  Private/Admin
router.delete('/:id/special-offer', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    product.isSpecialOffer = false;
    product.offerPrice = undefined;
    product.offerValidUntil = undefined;
    
    await product.save();
    
    res.json({
      id: product._id,
      isSpecialOffer: product.isSpecialOffer,
      message: 'Special offer removed'
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

export default router;
