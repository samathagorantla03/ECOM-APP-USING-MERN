import React, { useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
import {isfilter,sellerstatus} from '../reducers/productslice'
function Filter(){
    const dispatch=useDispatch();
    const [minprice,setminPrice]=useState();
    const [maxprice,setmaxPrice]=useState(50000);
    const [seller,setSeller]=useState();
    const sel=useRef();
    const products=useSelector((state)=>{
        return state.products.products;
    })
    console.log("!!!11",products)
    
    const filter=useSelector((state)=>{
        //console.log(state.products.isfilter)
        return state.products.isfilter;
    })
    const status=useSelector((state)=>{
        return state.products.sellerstatus
    })

    const handleMinChange=(e)=>{
       setminPrice(e.target.value);
       dispatch(isfilter(true));
       
    }
    const handleMaxChange=(e)=>{
        setmaxPrice(e.target.value);
        dispatch(isfilter(true));
        
     }
     let sellers=products.map((product)=>{
         return product.seller
     })
     
     let unique = sellers.filter((item, i, ar) => ar.indexOf(item) === i);
    return(
        <div className="p3">
            <div className="p2">
            <h3>Filter by price</h3>
            <input type="number" name='prange' placeholder="Price range" value={minprice} onChange={handleMinChange} /><br />
            <input type="number" name='prange' placeholder="Price range" value={maxprice} onChange={handleMaxChange} /><br />
            <h3>Filter by Seller</h3>

            <select name="dropseller" onChange={(e)=>{
                                
                                setSeller(e.target.value);
                                dispatch(sellerstatus(true));
                            }}>
                <option >-Select-</option>
                {   
                
                    unique.map((item)=>{
                        return(
                            <option value={item} name={item} >{item}</option>
                        )
                    })
                }
            </select>
            <button onClick={()=>{
                dispatch(isfilter(false))
                dispatch(sellerstatus(false));
                setminPrice('');
                setmaxPrice(50000);
                setSeller('');
                sel.current.select.clearValue()
                }}>Clear</button>
            </div>
            <div className="p1">
            {
                
                !filter?
                    !status?
                    products && products.map((product,i)=>{
                        return (
                            <div className='card'>
                            <img src={product.src} className='image'/>
                            <h2><Link to={`/item/${product._id}`}>{product.name}</Link></h2>
                            <h3>Product Price:{product.price}</h3>
                            <h3>Product seller:{product.seller}</h3>
                            </div>
                        )
                    }):
                    products && products.map((product)=>{
                        //console.log(price,product.price);
                        {
                            if(product.seller===seller){
                                return (
                                    <div className='card'>
                                    <img src={product.src} className='image'/>
                                    <h2><Link to={`/item/${product._id}`}>{product.name}</Link></h2>
                                    <h3>Product Price:{product.price}</h3>
                                    <h3>Product seller:{product.seller}</h3>
                                    </div>
                                )
                            }
                        }
                    })
                 :
                    !status?
                    products && products.map((product)=>{
                            //console.log(price,product.price);
                            {
                                if(parseInt(product.price)>=minprice && parseInt(product.price)<=maxprice){
                                    return (
                                        <div className='card'>
                                        <img src={product.src} className='image'/>
                                        <h2><Link to={`/item/${product._id}`}>{product.name}</Link></h2>
                                        <h3>Product Price:{product.price}</h3>
                                        <h3>Product seller:{product.seller}</h3>
                                        </div>
                                    )
                                }
                            }
                        }):
                        products && products.map((product)=>{
                                //console.log(price,product.price);
                                {
                                    if(parseInt(product.price)>=minprice && parseInt(product.price)<=maxprice && product.seller===seller){
                                        return (
                                            <div className='card'>
                                            <img src={product.src} className='image'/>
                                            <h2><Link to={`/item/${product._id}`}>{product.name}</Link></h2>
                                            <h3>Product Price:{product.price}</h3>
                                            <h3>Product seller:{product.seller}</h3>
                                            </div>
                                        )
                                    }
                                }
                            })
            }
            </div>
        </div>
    )
}
export default Filter