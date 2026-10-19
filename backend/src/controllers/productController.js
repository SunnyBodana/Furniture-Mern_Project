const mongoose = require('mongoose');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category: category.toLowerCase() } : {};
  
  const products = await Product.find(filter).sort({ createdAt: -1 });
  
  res.json({
    success: true,
    count: products.length,
    data: products,
  });
});

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  }

  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  }
  
  res.json({
    success: true,
    data: product,
  });
});

// @desc    Create product
// @route   POST /api/v1/products
// @access  Admin
exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  
  res.status(201).json({
    success: true,
    data: product,
  });
});

// @desc    Update product
// @route   PATCH /api/v1/products/:id
// @access  Admin
exports.updateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  }
  
  res.json({
    success: true,
    data: product,
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  }

  const product = await Product.findByIdAndDelete(req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  }
  
  res.json({
    success: true,
    data: {},
  });
});
