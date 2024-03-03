import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import  logo from '../../images/freshcart-logo.svg';
import { AuthContext } from '../../Context/AuthContext';
import { cartContext } from '../../Context/CartContext';

export default function Navbar() {

 const navigate = useNavigate();

  const {myToken , setToken} =  useContext(AuthContext)
const {numOfCartItems}= useContext(cartContext)

function logout (){
  setToken(null)
  localStorage.removeItem('tkn')
  navigate('/login')
}




// console.log("nav token " , myToken);

  return <>
  
  <nav className ="navbar navbar-expand-lg bg-body-tertiary">
  <div className ="container-fluid">
    <Link className ="navbar-brand" to="/products">
      <img src={logo} alt="logoFreshCart" />
    </Link>
    <button className ="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className ="navbar-toggler-icon"></span>
    </button>
    <div className ="collapse navbar-collapse" id="navbarSupportedContent">

{ myToken ? <ul className ="navbar-nav me-auto mb-2 mb-lg-0">
        <li className ="nav-item">
          <Link className ="nav-link active" aria-current="page" to="/products">Home</Link>
        </li>
        <li className ="nav-item">
          <Link className ="nav-link active" aria-current="page" to="/categories">Categories</Link>
        </li>
        <li className ="nav-item">
          <Link className ="nav-link active" aria-current="page" to="/brands">Brands</Link>
        </li>
        <li className ="nav-item position-relative ">
          <Link className ="nav-link active" aria-current="page" to="/cart">Cart</Link>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {numOfCartItems }
  </span>
        </li>
      </ul> : "" }


      <ul className ="navbar-nav ms-auto mb-2 mb-lg-0  align-items-center ">
        <li className ="nav-item">
<ul className='d-flex list-unstyled justify-content-between ' >
  <li>
    <i className=' me-3 fa-solid fa-brands fa-facebook-f' ></i>
  </li>
  <li>
    <i className=' me-3 fa-solid fa-brands fa-instagram' ></i>
  </li>
  <li>
    <i className=' me-3 fa-solid fa-brands fa-twitter' ></i>
  </li>
  <li>
    <i className=' me-3 fa-brands fa-linkedin' ></i>
  </li>
</ul>

        </li>


{myToken?         <li className ="nav-item">
          <span onClick={logout} role='button' className ="nav-link active" >Logout</span>
        </li> : <>
        <li className ="nav-item">
          <Link className ="nav-link active"  to="/login">Login</Link>
        </li>
        <li className ="nav-item">
          <Link className ="nav-link active"  to="/register">Register</Link>
        </li>
        </>}
        


      </ul>


    </div>
  </div>
</nav>
  
  
  
  
  </>
}
