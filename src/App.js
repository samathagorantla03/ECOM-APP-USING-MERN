// import logo from './logo.svg';
import './App.css';
import {Link, Navigate} from 'react-router-dom'
import Filter from './components/filters';
import Product from './components/products';
import { setIsAuthenticated } from './reducers/loginslice';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';

function App() {
  
  // let user= useSelector((state) => {
      
  //   return state.users.user;
  // });
  const dispatch=useDispatch();
  const navigate=useNavigate();
  //const token=localStorage.getItem('token');
  const user=JSON.parse(localStorage.getItem('user'));
  const isAuthenticated=useSelector((state) => {
      
      return state.users.isAuthenticated;
    });
  return (
    <div className="App">
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark w-100">
        <a className="navbar-brand" href="#"><h1>WALcart</h1></a>

        <ul className="navbar-nav ml-auto">
           <li className="nav-item">
           <Link to='/filter'>Filter</Link>
           </li>
           <li className="nav-item">
           <Link to='/image'>Image</Link>
           </li>
          <li className="nav-item" >
            <Link to='/register'>Register</Link>
          </li>&nbsp;&nbsp;&nbsp;
            
            {user!=null?(user.usertype=='admin'? <li className="nav-item float-right" ><Link to='/addproduct'>Add product</Link>
             </li>:<li className="nav-item">
              <Link to='/cart'>Cart</Link>
          </li>):<div></div>    
            }
            {
            isAuthenticated?<li className="nav-item">
            <button onClick={()=>{window.localStorage.clear()
              dispatch(setIsAuthenticated(false));
              navigate("/");
            }}>Logout</button>
            </li>:<li className="nav-item">
           <Link to='/login'>Login</Link>
           </li>
          }
      </ul>
      {/* <ul className='navbar-nav mr-auto'>
      <li className="nav-item" >
            <Link to='/register'>Register</Link>
          </li>
      </ul> */}
    </nav>
</div>  
    <div>
      <Filter></Filter> 
      {/* <Product></Product> */}
    </div>
    </div>
  );
}

export default App;
