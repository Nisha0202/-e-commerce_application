// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types/types';
import { CartState } from '../../types/types';

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // removeFromCart: (state, action: PayloadAction<number>) => {
    //   state.items = state.items.filter((item) => item.id !== action.payload);
    // },
    // clearCart: (state) => {
    //   state.items = [];
    // },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

