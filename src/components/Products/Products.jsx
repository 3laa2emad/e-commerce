import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MutatingDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import SimpleSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function Products() {

const {addProductToCart} = useContext(cartContext)

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

// const [AllProduct, setAllProduct] = useState([])
// const [AllProduct , setAllProduct] = useState(null)

async function getAllProduct(){
    return await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  
// await axios.get('https://ecommerce.routemisr.com/api/v1/products')
//   .then( (res)=>{
//     setAllProduct(res.data.data);
//   })
//   .catch( (err)=>{
//     console.log(err);
//   })
}

const {data , isLoading   } = useQuery('getAllProduct' , getAllProduct , {
  refetchInterval: 3000
})

// console.log( data?.data.data);

// useEffect(function(){
//   getAllProduct()
// } , [])

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

  return <>


<div className='container' >

<div className="row my-4">
  <div className="col-md-9">
  <SimpleSlider />
  </div>
  <div className="col-md-3">
    <div>
    <img style={{height:"150px"}}  className='w-100'  src={require('../../images/grocery-banner.png')} alt="" />
    </div>
    <div>
    <img style={{height:"150px"}} className='w-100' src={require('../../images/grocery-banner-2.jpeg')} alt="" />
    </div>

  </div>
</div>

 
<CategorySlider />


<div className='row g-3 mt-3 products ' >
  {data.data.data.map( (product , idx)=> { return <div className='col-md-2 overflow-hidden ' >
<Link className='product' to={`/productDetails/${product.id}`} >  
  <div  >
      <img src={product.imageCover} className='w-100' alt="broduct" />
      <h3 className='h6 text-main'  >{product.category.name}</h3>
      <h2 className='h5 text-center' >{product.title.split(' ').slice(0,2).join(' ')}</h2>
<div className='d-flex justify-content-between' >
  {product.priceAfterDiscount ? <p><span className='text-decoration-line-through' >{product.price + " EGP"}</span>-{product.priceAfterDiscount+ " EGP"}</p> : <p>{product.price+ " EGP"}</p>}
      <p> <i className='fa-solid fa-star' style={{color:'yellowgreen'}}  ></i>  {product.ratingsAverage}</p>
</div>
{/* <p>{product.id}</p> */}
      </div> </Link>

<button onClick={()=>addMyProduct(product.id)} className='btn addBtn bg-main text-white d-block m-auto' >+</button>
      
  </div>} )}
  
</div>
</div>



{/* {AllProduct?   <div className='container' >

<div className='row g-3' >
  {AllProduct.map( (product , idx)=><div className='col-md-2' >
    <div className='product' >
      <img src={product.imageCover} className='w-100' alt="broduct" />
      <h3 className='h6 text-main'  >{product.category.name}</h3>
      <h2 className='h5 text-center' >{product.title.split(' ').slice(0,2).join(' ')}</h2>
<div className='d-flex justify-content-between' >
  {product.priceAfterDiscount ? <p><span className='text-decoration-line-through' >{product.price + " EGP"}</span>-{product.priceAfterDiscount+ " EGP"}</p> : <p>{product.price+ " EGP"}</p>}
      <p> <i className='fa-solid fa-star' style={{color:'yellowgreen'}}  ></i>  {product.ratingsAverage}</p>
</div>
      </div> 
  </div> )}
  
</div>
</div> : <div className='d-flex justify-content-center align-items-center bg-opacity-50 p-5 ' > */}

{/* <MutatingDots
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  secondaryColor="#4fa94d"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />

</div>} */}






  
  </>
}
