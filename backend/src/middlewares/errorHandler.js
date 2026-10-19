/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let status = err.status || err.statusCode || 500;
  let message = err.message || 'Internal server error';

  // Handle Mongoose invalid ObjectId (CastError)
  if (err.name === 'CastError') {
    status = 404;
    message = 'Resource not found';
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    status = 400;
    message = 'Duplicate field value entered';
  }

  // Handle Mongoose validation error
  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
