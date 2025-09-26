import express from 'express';
import { protect, admin, superadmin } from '../middleware/auth.js';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

const router = express.Router();

// @route   GET /api/admin
// @desc    Get all admins (only for superadmin)
// @access  Private/Superadmin
router.get('/', protect, superadmin, async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json(admins);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/admin
// @desc    Create a new admin (only for superadmin)
// @access  Private/Superadmin
router.post('/', protect, superadmin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create new admin
    admin = new Admin({
      name,
      email,
      password,
      role: role || 'admin'
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    await admin.save();
    
    // Don't send back the password
    admin.password = undefined;
    
    res.status(201).json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/admin/:id
// @desc    Get admin by ID (only for superadmin)
// @access  Private/Superadmin
router.get('/:id', protect, superadmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/admin/:id
// @desc    Update admin (only for superadmin or the admin themselves)
// @access  Private/Admin
router.put('/:id', protect, async (req, res) => {
  const { name, email, currentPassword, newPassword, role } = req.body;
  const updates = {};
  
  try {
    let admin = await Admin.findById(req.params.id);
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    // Check if the requester is the same admin or a superadmin
    const isSuperadmin = req.admin.role === 'superadmin';
    const isSelf = req.admin.id === req.params.id;
    
    if (!isSelf && !isSuperadmin) {
      return res.status(403).json({ message: 'Not authorized to update this admin' });
    }
    
    // Update name if provided
    if (name) updates.name = name;
    
    // Update email if provided
    if (email && email !== admin.email) {
      // Check if email is already taken
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin && existingAdmin._id.toString() !== req.params.id) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
      updates.email = email;
    }
    
    // Update password if current password is provided and correct
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(newPassword, salt);
    }
    
    // Update role (only for superadmin)
    if (role && isSuperadmin) {
      updates.role = role;
    }
    
    // Update the admin
    admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    ).select('-password');
    
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/admin/:id
// @desc    Delete admin (only for superadmin)
// @access  Private/Superadmin
router.delete('/:id', protect, superadmin, async (req, res) => {
  try {
    // Don't allow deleting self
    if (req.admin.id === req.params.id) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }
    
    const admin = await Admin.findById(req.params.id);
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    // Don't allow deleting the last superadmin
    if (admin.role === 'superadmin') {
      const superadminCount = await Admin.countDocuments({ role: 'superadmin' });
      if (superadminCount <= 1) {
        return res.status(400).json({ message: 'Cannot delete the last superadmin' });
      }
    }
    
    await admin.remove();
    
    res.json({ message: 'Admin removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/admin/:id/status
// @desc    Toggle admin active status (only for superadmin)
// @access  Private/Superadmin
router.put('/:id/status', protect, superadmin, async (req, res) => {
  try {
    // Don't allow deactivating self
    if (req.admin.id === req.params.id) {
      return res.status(400).json({ message: 'You cannot deactivate your own account' });
    }
    
    const admin = await Admin.findById(req.params.id);
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    // Don't allow deactivating the last superadmin
    if (admin.role === 'superadmin' && admin.isActive) {
      const activeSuperadminCount = await Admin.countDocuments({ 
        role: 'superadmin', 
        isActive: true 
      });
      
      if (activeSuperadminCount <= 1) {
        return res.status(400).json({ 
          message: 'Cannot deactivate the last active superadmin' 
        });
      }
    }
    
    admin.isActive = !admin.isActive;
    await admin.save();
    
    res.json({ 
      id: admin._id, 
      isActive: admin.isActive,
      message: `Admin account has been ${admin.isActive ? 'activated' : 'deactivated'}`
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(500).send('Server Error');
  }
});

export default router;
