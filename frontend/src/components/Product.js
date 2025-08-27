// components/Product.js

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Framer Motion ko import kiya

const Product = ({ product }) => {
  // Card ke liye animation variants banaye
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    // div ko motion.div se badal diya aur variants add kiye
    <motion.div
      className="card"
      variants={cardVariants}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }} // Hover animation
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          className="product-image"
          alt={product.name}
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400?text=Image+Not+Found' }}
        />
      </Link>

      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <div className="card-title">
            <strong>{product.name}</strong>
          </div>
        </Link>

        <h3 className="card-price">₹{product.price.toLocaleString('en-IN')}</h3>
        <p>Rating: {product.rating} from {product.numReviews} reviews</p>
      </div>
    </motion.div>
  );
};

export default Product;
