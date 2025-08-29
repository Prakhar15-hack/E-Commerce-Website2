// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/ProductModel.js');

// Route 1: Saare products ya search results laane ke liye
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};
    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route 2: Ek single product laane ke liye
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Naya Route 3: Category ke hisaab se products laane ke liye
// GET /api/products/category/Graphics%20Card
router.get('/category/:categoryName', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.categoryName });
        if (products) {
            res.json(products);
        } else {
            res.status(404).json({ message: 'Products in this category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;
