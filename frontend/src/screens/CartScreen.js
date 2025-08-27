// screens/CartScreen.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/cartSlice'; // removeFromCart ko import kiya

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux store se cartItems ko nikal rahe hain
  const { cartItems } = useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    // removeFromCart action ko dispatch kar rahe hain
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    // Abhi ke liye hum login page par bhej denge
    navigate('/login');
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          Your cart is empty. <Link to="/">Go Back</Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <Link to={`/product/${item._id}`} className="cart-item-name">{item.name}</Link>
                <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</p>
                
                {/* Quantity Selector */}
                <select
                  value={item.qty}
                  onChange={(e) => dispatch(addToCart({ ...item, qty: Number(e.target.value) }))}
                  className="qty-select-cart"
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>

                <button className="remove-btn" onClick={() => removeFromCartHandler(item._id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
            <p className="total-price">Total: ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString('en-IN')}</p>
            <button className="checkout-btn" onClick={checkoutHandler}>
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
