import express from 'express';
import auth from '../middleware/auth.js';
import Price from '../models/Price.js';

const router = express.Router();

// @route   GET /api/prices
// @desc    Get current prices
// @access  Public
router.get('/', async (req, res) => {
  try {
    let prices = await Price.findOne();

    if (!prices) {
      // Create default prices if none exist
      prices = new Price({
        chicken: { current: 300, previous: 280 },
        mutton: { current: 680, previous: 650 },
        natukodi: { current: 380, previous: 370 }
      });
      await prices.save();
    }

    res.json(prices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/prices
// @desc    Update prices
// @access  Private (Admin only)
router.put('/', auth, async (req, res) => {
  try {
    const { chicken, mutton, natukodi } = req.body;

    let prices = await Price.findOne();

    if (!prices) {
      prices = new Price();
    }

    // Update prices
    if (chicken !== undefined) {
      prices.chicken = {
        current: chicken.current,
        previous: chicken.previous || prices.chicken?.current || 280
      };
    }

    if (mutton !== undefined) {
      prices.mutton = {
        current: mutton.current,
        previous: mutton.previous || prices.mutton?.current || 650
      };
    }

    if (natukodi !== undefined) {
      prices.natukodi = {
        current: natukodi.current,
        previous: natukodi.previous || prices.natukodi?.current || 370
      };
    }

    prices.lastUpdated = new Date();

    await prices.save();

    res.json({
      success: true,
      message: 'Prices updated successfully',
      prices
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/prices
// @desc    Add new product price
// @access  Private (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { name, emoji, price, unit } = req.body;

    if (!name || !emoji || !price) {
      return res.status(400).json({ message: 'Name, emoji, and price are required' });
    }

    let prices = await Price.findOne();

    if (!prices) {
      prices = new Price();
    }

    // Add new product price
    prices.products = prices.products || {};
    prices.products[name.toLowerCase()] = {
      name,
      emoji,
      current: price,
      previous: price,
      unit: unit || 'per kg'
    };

    prices.lastUpdated = new Date();

    await prices.save();

    res.json({
      success: true,
      message: 'New product added successfully',
      prices
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
