// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/ProductModel.js');

// Yeh route ab search keyword bhi handle karega
// GET /api/products?keyword=rtx
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i', // 'i' ka matlab hai case-insensitive (RTX aur rtx ek hi baat hai)
          },
        }
      : {};

    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /api/products/:id (yeh same rahega)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
