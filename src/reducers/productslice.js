import { createSlice } from '@reduxjs/toolkit';
const productslice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filproducts:[],
    isfilter:false,
    sellerstatus:false,
  },
  reducers: {
    loadproducts: function (state, action) {
      //console.log("****",action.payload);
      state.products= action.payload;
    },
    isfilter: function(state,action){
      state.isfilter=action.payload;
    },
    sellerstatus:function(state,action){
      state.sellerstatus=action.payload
    }
  },
});
export function getProducts() {
    return (dispatch) => {
      fetch('http://localhost:8080/getproductsdata')
        .then((res) => res.json())
        .then((data) => {
          dispatch(loadproducts(data));
        });
    };
  }
export const addproduct = (product) => {
    //console.log("addMovies called")
    return async (dispatch) => {
        const response = await fetch('http://localhost:8080/addproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        dispatch(getProducts());
    };
};


export const { loadproducts,isfilter,sellerstatus,setUrl} = productslice.actions;
export default productslice.reducer;