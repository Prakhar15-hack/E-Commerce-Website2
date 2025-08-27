// store.js

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './redux/cartSlice';
import userReducer from './redux/userSlice'; // User reducer ko import kiya

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer, // Naya user reducer add kiya
  },
});

export default store;
