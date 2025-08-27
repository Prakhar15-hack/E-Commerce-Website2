// models/productModel.js

const mongoose = require('mongoose');

// Yahaan hum product ka blueprint (Schema) bana rahe hain
const productSchema = mongoose.Schema(
  {
    // Har product ka ek naam hoga, jo String type ka hoga
    name: {
      type: String,
      required: true, // Naam dena zaroori hai
    },
    // Har product ki ek image hogi
    image: {
      type: String,
      required: true,
    },
    // Product ka description
    description: {
      type: String,
      required: true,
    },
    // Product ka brand
    brand: {
      type: String,
      required: true,
    },
    // Product ki category
    category: {
      type: String,
      required: true,
    },
    // Product ka price
    price: {
      type: Number,
      required: true,
      default: 0, // Agar price nahi diya toh 0 maan lo
    },
    // Stock mein kitne items hain
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    // Product ki rating
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    // Kitne reviews hain
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    // Yeh automatically `createdAt` aur `updatedAt` fields add kar dega
    timestamps: true,
  }
);

// Is Schema se ek Model bana rahe hain
const Product = mongoose.model('Product', productSchema);

// Model ko export kar rahe hain
module.exports = Product;
