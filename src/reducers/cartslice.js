import { createSlice } from '@reduxjs/toolkit';
import { setUser } from './loginslice';
const cartslice = createSlice({
  name: 'carts',
  initialState: {
    carts: [],
    user: {},
  },
  reducers: {
    loadcarts: function (state, action) {
      // const arr=action.payload.filter((item)=>{
      //   //console.log("username",state.user)
      //   return item.username===state.user.username
      // })
      
      //console.log("#####",arr);
      state.carts= action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      // state.isAuthenticated = true;
  },
  },
});
export function getcarts() {
    return (dispatch) => {
      fetch('http://localhost:8080/getcartdata')
        .then((res) => res.json())
        .then((data) => {
          dispatch(loadcarts(data));
          dispatch(setUser( JSON.parse(localStorage.getItem('user'))))
        });
    };
  }
export const addtocart = (cart) => {
    console.log("addMovies called",cart)
    return async (dispatch) => {
        const response = await fetch('http://localhost:8080/addtocart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cart),
        });
        dispatch(getcarts());
    };
};

export const deleteitem = (productid) => {
  return async (dispatch) => {
      const response = await fetch(`http://localhost:8080/delitem/${productid}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      dispatch(getcarts());
  };
};
export const { loadcarts} = cartslice.actions;
export default cartslice.reducer;