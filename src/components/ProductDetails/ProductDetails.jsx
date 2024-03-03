import axios from 'axios';
import React, { useContext } from 'react'
import { MutatingDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {

const {addProductToCart} = useContext(cartContext)

// console.log("addProductToCart", addProductToCart);

async function addMyProduct(id){
  const res = await addProductToCart(id);

  if(res){
    // console.log('addedd successfully');
    toast.success("Added successfully" , {duration:1500 , position:'top-right'})
  }
  else{
    // console.log('error occurred');
    toast.error("error occurred" , {duration:1500 , position:'top-right'})


  }
}


const {id} = useParams();

function getProductDetails(){
 return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}

const {data , isLoading , isError} = useQuery(`productDetails-${id}` , getProductDetails)

if(isLoading){
  return<div className='d-flex justify-content-center align-items-center bg-opacity-50 p-5 ' >

  {<MutatingDots
    visible={true}
    height="100"
    width="100"
    color="#4fa94d"
    secondaryColor="#4fa94d"
    radius="12.5"
    ariaLabel="mutating-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />}
  
  </div> 
}

if(isError){
  return<Navigate to='/products' />
}


const productDetails = data?.data.data;

  return <>
  
  <div className='container '>
<div className='row align-items-center '>
  <div className='col-md-3' >

<figure>
  <img className='w-100' src={productDetails.imageCover} alt={productDetails.title} />
</figure>

  </div>

<div className='col-md-9' >
<article>
  <h1>{productDetails.title}</h1>
  <p>{productDetails.description}</p>
  <p className='text-main' >{productDetails.category.name}</p>
  <div className='d-flex justify-content-between' >
    {/* <p>{productDetails.price + 'EGP'}</p> */}
    {productDetails.priceAfterDiscount ? <p><span className='text-decoration-line-through' >{productDetails.price + " EGP"}</span>-{productDetails.priceAfterDiscount+ " EGP"}</p> : <p>{productDetails.price+ " EGP"}</p>}
    <p>
      <i style={{color:'yellowgreen'}} className='fa-solid fa-star ' ></i>
      {productDetails.ratingsAverage}</p>
  </div>
  <button onClick={()=>addMyProduct(productDetails.id)} className='btn bg-main w-100 text-white my-2 ' >Add to cart</button>
</article>
</div>

</div>
  </div>
  
  
  
  </>
}
