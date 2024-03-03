import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import { MutatingDots } from 'react-loader-spinner'
import toast from 'react-hot-toast'

export default function Cart() {

const {
  updateCount , totalCartPrice , allProducts , deleteProduct
} = useContext(cartContext)


if(!allProducts){
  return <div className='d-flex justify-content-center align-items-center bg-opacity-50 p-5 ' >

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

async function UpdateMyProductCount(id , newCount){

 const res = await updateCount(id , newCount);

 if(res){
  toast.success('product updated successfully' , {position: 'top-center'})
 }
 else{
  toast.error('product updated error' , {position: 'top-center'})

 }
}


 async function myDeleteProduct(id){
  const res = await deleteProduct(id);
  if(res){
    toast.success('deleted successfully', {position:'top-center'})
  }
  else{
    toast.error('deleted error', {position:'top-center'})

  }
}

  return<>
  <div className='container my-2' >
<h2>Shop Cart</h2>
<h5>Total cart Price: {totalCartPrice} LE</h5>
{allProducts.map((product , idx)=><div key={idx} className="row align-items-center py-2">
  <div className="col-md-1">

<figure>
  <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
</figure>
  </div>

  <div className="col-md-9">

<article>
<h3>{product.product.title}</h3>
<h5>price: {product.price}</h5>
<button onClick={()=>{myDeleteProduct(product.product.id)}} className='btn btn-outline-danger' >Remove</button>
</article>

  </div>
  <div className="col-md-2">
<div className='d-flex justify-content-between align-items-center' >
  <button onClick={()=>UpdateMyProductCount(product.product.id , product.count + 1)} className='btn btn-outline-success' >+</button>
  <p>{product.count}</p>
  <button disabled={product.count == 1} onClick={()=>UpdateMyProductCount(product.product.id , product.count - 1)} className='btn btn-outline-success' >-</button>
</div>
  </div>
</div>)}


  </div>
  
  
  
  </>
}
