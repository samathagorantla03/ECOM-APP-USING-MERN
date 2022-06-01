import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/login'
import Register from './components/registration'
import Item from './components/eachitem';
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import { Provider } from 'react-redux';
import {store} from './store'
import Addproduct from './components/addproduct';
import Cart from './components/cart';
import Filter from './components/filters';
import Image from './components/imagefile';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/item/:pid' element={<Item/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/addproduct' element={<Addproduct/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/filter' element={<Filter/>}></Route>
        <Route path='/image' element={<Image/>}></Route>
        <Route path='/' element={<App/>}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
