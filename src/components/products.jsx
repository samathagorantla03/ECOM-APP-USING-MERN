import React from 'react'
import { getProducts} from '../reducers/productslice';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
// import Addmovie from './addmovie';


function Products(){
    const dispatch = useDispatch();
    const products = useSelector((state) => {
      //console.log("####",state.movies);
      return state.products.products;
    });
    // const eid=useSelector((state)=>{
    //     return state.movies.Editid;
    // })
    React.useEffect(() => {
      dispatch(getProducts());
    }, [dispatch]);
    return(
        <div className='p1'>
            {/* {
                eid!='' && (
                    <Addmovie />
                )
            } */}
            {
                    products && products.map((product,i)=>{
                    return (
                        <div className='card'>
                        <img src={product.src} className='image'/>
                        <h2><Link to={`/item/${product._id}`}>{product.name}</Link></h2>
                        <h3>Product Price:{product.price}</h3>
                        </div>
                    )
                })
            }
         </div>
    )
}
export default Products