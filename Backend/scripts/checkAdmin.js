import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const checkAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');

    // Find admin user
    const admin = await Admin.findOne({ email: 'admin@bbshop.com' });
    
    if (!admin) {
      console.log('No admin user found');
      return;
    }

    console.log('Admin user found:');
    console.log(`Email: ${admin.email}`);
    console.log(`Is Active: ${admin.isActive}`);
    console.log(`Role: ${admin.role}`);
    console.log('Checking password...');
    
    // Test password
    const isMatch = await admin.comparePassword('admin123');
    console.log(`Password match: ${isMatch}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

checkAdmin();
