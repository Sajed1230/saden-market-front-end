// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // will hold logged-in user info
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Save user info and ensure cart is initialized
      state.user = {
        ...action.payload,
        cart: action.payload.cart?.map((item) => ({
          product: item.product,
          quantity: item.quantity || 1,
        })) || [],
      };
    },
    clearUser: (state) => {
      state.user = null; // logout
    },
    addToCart: (state, action) => {
      if (!state.user) return;
      const { product } = action.payload;

      // Check if product is already in cart
      const existingItem = state.user.cart.find(
        (item) => item.product._id === product._id
      );

      if (existingItem) {
        existingItem.quantity += 1; // increment quantity
      } else {
        state.user.cart.push({ product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      if (!state.user) return;
      const { productId } = action.payload;
      state.user.cart = state.user.cart.filter(
        (item) => item.product._id !== productId
      );
    },
    clearCart: (state) => {
      if (state.user) state.user.cart = [];
    },
    // NEW: Update quantity of a product
    updateCartItemQuantity: (state, action) => {
      if (!state.user) return;
      const { productId, quantity } = action.payload;
      const item = state.user.cart.find(
        (item) => item.product._id === productId
      );
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const {
  setUser,
  clearUser,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemQuantity,
} = userSlice.actions;

export default userSlice.reducer;
