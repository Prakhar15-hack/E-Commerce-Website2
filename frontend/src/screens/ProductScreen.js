// screens/ProductScreen.js

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import axios from 'axios';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <div className="product-screen-container">
      <Link to="/" className="back-button">
        &larr; Go Back
      </Link>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3 className="error-message">Error: {error}</h3>
      ) : (
        <>
          <div className="product-details-grid">
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-detail-image"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400?text=Image+Not+Found' }}
              />
            </div>
            <div className="product-info">
              <h1>{product.name}</h1>
              <p className="product-rating">
                Rating: {product.rating} from {product.numReviews} reviews
              </p>
              <p className="product-price">Price: ₹{product.price?.toLocaleString('en-IN')}</p>
              <p className="product-description">Description: {product.description}</p>
            </div>
            <div className="product-actions">
              <div className="action-card">
                  <p>Price: <strong>₹{product.price?.toLocaleString('en-IN')}</strong></p>
                  <p>Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>

                  {product.countInStock > 0 && (
                    <div className="qty-selector">
                      <label htmlFor="qty">Qty:</label>
                      <select id="qty" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                      className="add-to-cart-btn"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                  >
                      Add To Cart
                  </button>
              </div>
            </div>
          </div>

          <div className="product-extra-details">
            <div className="specifications">
                <h2>Specifications</h2>
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                    <table className="spec-table">
                        <tbody>
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <tr key={key}>
                                    <td><strong>{key}</strong></td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <p>No specifications available.</p>}
            </div>

            <div className="reviews">
                <h2>Reviews</h2>
                {product.reviews && product.reviews.length > 0 ? (
                    <ul className="review-list">
                        {product.reviews.map((review, index) => (
                            <li key={index} className="review-item">
                                <strong>{review.name}</strong>
                                <p>Rating: {review.rating}/5</p>
                                <p>{review.comment}</p>
                            </li>
                        ))}
                    </ul>
                ) : <p>No reviews yet.</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
