// seeder/seeder.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('../data/products.js');
const Product = require('../models/productModel.js');
const connectDB = require('../config/db.js');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Pehle saare purane products delete kar rahe hain
    await Product.deleteMany();

    // Naye products daal rahe hain
    await Product.insertMany(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Saare products delete kar rahe hain
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Command line se check kar rahe hain ki data import karna hai ya destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
