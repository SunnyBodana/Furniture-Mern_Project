const express = require('express');
const router = express.Router();
const {
  getUserOrders,
  getOrder,
  getAllOrders,
} = require('../controllers/orderController');
const requireAuth = require('../middlewares/requireAuth');
const requireAdmin = require('../middlewares/requireAdmin');

// Admin routes
router.get('/admin/all', requireAuth, requireAdmin, getAllOrders);

// User routes
router.get('/', requireAuth, getUserOrders);
router.get('/:id', requireAuth, getOrder);

module.exports = router;
