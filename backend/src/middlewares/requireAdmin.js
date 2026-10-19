const admin = require('../config/firebaseAdmin');
const requireAuth = require('./requireAuth');

/**
 * Middleware to check if user has admin role
 * Requires requireAuth to run first
 * Checks for custom claim 'admin: true' or email-based admin list
 */
const requireAdmin = async (req, res, next) => {
  try {
    // First verify auth
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Authentication required' 
      });
    }

    // Check custom claims
    const userRecord = await admin.auth().getUser(req.user.uid);
    const customClaims = userRecord.customClaims || {};
    
    // Allow if admin claim is true OR email is in admin list
    const adminEmails = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map(email => email.trim().toLowerCase())
      .filter(Boolean);
    const userEmail = (req.user.email || '').toLowerCase();
    const isAdmin = customClaims.admin === true || (Boolean(userEmail) && adminEmails.includes(userEmail));

    if (!isAdmin) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'Admin access required' 
      });
    }

    req.user.isAdmin = true;
    next();
  } catch (error) {
    console.error('Admin check error:', error.message);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: 'Failed to verify admin status' 
    });
  }
};

module.exports = requireAdmin;
