import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../src/features/cart/cartSlice'; 
import { productApi } from '../src/services/productApi'; 


const rootReducer = combineReducers({
  cart: cartReducer,
  [productApi.reducerPath]: productApi.reducer, //the product API reducer
});

export default rootReducer;

