// screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import { motion } from 'framer-motion'; // Framer Motion ko import kiya

const HomeScreen = () => {
  // Yahaan humne _useState ko = useState se theek kar diya hai
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Grid container ke liye animation variants banaye
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Har card ke beech 0.1s ka delay
      },
    },
  };

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>Error: {error}</h3>
      ) : (
        // div ko motion.div se badal diya aur variants add kiye
        <motion.div
          className="product-grid"
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default HomeScreen;
