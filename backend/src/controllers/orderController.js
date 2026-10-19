const mongoose = require('mongoose');
const Order = require('../models/Order');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get user's orders
// @route   GET /api/v1/orders
// @access  Private
exports.getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user.uid })
    .sort({ createdAt: -1 })
    .populate('items.productId');
  
  res.json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

// @desc    Get single order
// @route   GET /api/v1/orders/:id
// @access  Private (owner or admin)
exports.getOrder = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      success: false,
      error: 'Order not found',
    });
  }

  const order = await Order.findById(req.params.id).populate('items.productId');
  
  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found',
    });
  }
  
  // Check if user owns the order or is admin
  if (order.userId !== req.user.uid && !req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to access this order',
    });
  }
  
  res.json({
    success: true,
    data: order,
  });
});

// @desc    Get all orders (admin)
// @route   GET /api/v1/admin/orders
// @access  Admin
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate('items.productId');
  
  res.json({
    success: true,
    count: orders.length,
    data: orders,
  });
});
