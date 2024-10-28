import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItems, CartProductListParams } from "../types/cartProductTypes";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addProductToCart: (
      state: CartItems,
      action: PayloadAction<CartProductListParams>
    ) => {
      const itemPresents = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (!itemPresents) {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (
      state: CartItems,
      action: PayloadAction<CartProductListParams>
    ) => {
      const removeItem = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      state.cart = removeItem;
    },
    increaseQty: (
      state: CartItems,
      action: PayloadAction<CartProductListParams>
    ) => {
      const result = state.cart.find((item) => item._id === action.payload._id);
      if (result) {
        result.quantity++;
      }
    },
    decreaseQty: (
      state: CartItems,
      action: PayloadAction<CartProductListParams>
    ) => {
      const result = state.cart.find((item) => item._id === action.payload._id);
      if (result) {
        result.quantity = Math.max(result.quantity - 1, 1);
      }
    },
    emptyCart: (state: CartItems) => {
      state.cart = [];
    },
  },
});

export const {
  addProductToCart,
  decreaseQty,
  emptyCart,
  increaseQty,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
