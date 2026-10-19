const express = require('express');
const router = express.Router();
const { getMe } = require('../controllers/authController');
const requireAuth = require('../middlewares/requireAuth');
const requireAdmin = require('../middlewares/requireAdmin');

router.get('/me', requireAuth, getMe);

// BUG FIX #3: Used by the frontend AdminRoute component to verify admin status.
// Returns 200 if the user is admin, 403 if not (handled by requireAdmin middleware).
router.get('/check-admin', requireAuth, requireAdmin, (req, res) => {
  res.json({ success: true, isAdmin: true });
});

module.exports = router;
