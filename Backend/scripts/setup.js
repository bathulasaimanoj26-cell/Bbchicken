import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import Product from '../models/Product.js';

dotenv.config();

const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bbshop';
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (!existingAdmin) {
      // Create default admin user
      const admin = new Admin({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL || 'admin@bbshop.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'superadmin'
      });

      await admin.save();
      console.log('Default admin user created successfully');
      console.log(`Email: ${admin.email}`);
      console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    } else {
      console.log('Admin user already exists');
    }

    // Create default products if they don't exist
    const existingProducts = await Product.countDocuments();
    
    if (existingProducts === 0) {
      const defaultProducts = [
        {
          name: 'Chicken',
          category: 'chicken',
          price: 300,
          description: 'Fresh chicken cuts including whole chicken, breast pieces, drumsticks, and more. All cuts are cleaned and prepared fresh daily.',
          image: '',
          isAvailable: true,
          isSpecialOffer: false
        },
        {
          name: 'Mutton',
          category: 'mutton',
          price: 680,
          description: 'Premium quality mutton cuts from healthy goats. All cuts are expertly prepared and delivered fresh to maintain the best taste and quality.',
          image: '',
          isAvailable: true,
          isSpecialOffer: false
        },
        {
          name: 'Natukodi',
          category: 'natukodi',
          price: 380,
          description: 'Premium country chicken (Natukodi) raised naturally. Known for its rich flavor and nutritional value. Perfect for traditional recipes and healthy meals.',
          image: '',
          isAvailable: true,
          isSpecialOffer: false
        }
      ];

      await Product.insertMany(defaultProducts);
      console.log('Default products created successfully');
      console.log('Products:', defaultProducts.map(p => `${p.name} - ₹${p.price}/kg`).join(', '));
    } else {
      console.log('Products already exist in database');
    }
    
  } catch (error) {
    console.error('Setup failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

setupDatabase();
