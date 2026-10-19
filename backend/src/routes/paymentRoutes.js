const express = require('express');
const router = express.Router();
const {
  createCheckoutSession,
  handleStripeWebhook,
} = require('../controllers/paymentController');
const requireAuth = require('../middlewares/requireAuth');

// Webhook - raw body is already applied at app level in app.js (before express.json)
// BUG FIX #7: Do NOT re-add express.raw() here — body is already raw at this point.
router.post('/webhooks/stripe', handleStripeWebhook);

// Checkout session creation (requires auth)
router.post('/session', requireAuth, createCheckoutSession);

module.exports = router;
