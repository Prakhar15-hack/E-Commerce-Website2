// screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams ko import kiya
import axios from 'axios';
import Product from '../components/Product';
import { motion } from 'framer-motion';

const HomeScreen = () => {
  const { keyword } = useParams(); // URL se search keyword nikala
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Ab hum search keyword ke saath API call karenge
        const { data } = await axios.get(`http://localhost:5000/api/products?keyword=${keyword || ''}`);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]); // useEffect ab keyword change hone par bhi chalega

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div>
      <h1>{keyword ? `Results for "${keyword}"` : 'Latest Products'}</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>Error: {error}</h3>
      ) : (
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
