import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from '../reducers/loginslice'
import productReducer from '../reducers/productslice'
import cartReducer from '../reducers/cartslice'
export const store = configureStore({
  reducer: {
    users: LoginReducer,
    products:productReducer,
    cart:cartReducer
  },
});
