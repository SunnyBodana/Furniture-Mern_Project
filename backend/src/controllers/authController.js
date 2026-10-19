const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get current user profile
// @route   GET /api/v1/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  // Find or create user in DB
  let user = await User.findOne({ uid: req.user.uid });
  
  if (!user) {
    user = await User.create({
      uid: req.user.uid,
      email: req.user.email,
      displayName: req.user.displayName,
      lastLogin: new Date(),
    });
  } else {
    user.lastLogin = new Date();
    await user.save();
  }
  
  res.json({
    success: true,
    data: {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
    },
  });
});
