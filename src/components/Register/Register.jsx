import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Circles, LineWave } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"

// const mySchema = Yup.object({
//   name:Yup.string().required("name is required").min(3, 'at least 3 char').max(8 , "max is 8"),
//   email:Yup.string().required('email is required').email(),
//   phone: Yup.string().required('phone is required'),
//   password: Yup.string().required('password is required').min(6 , 'at least 6 char').max(12 , 'max 12 char'),
//   rePassword: Yup.string().oneOf([Yup.ref('password')]),
// })

export default function Register() {

const userData = {
  name: '',
  email: '',
  phone: '',
  password: '',
  rePassword: '',
}

const myNavigate = useNavigate();

const [isSuccses, setisSuccses] = useState(false);
const [errMessage, setErrMessage] = useState(undefined)
const [isLoading, setIsLoading] = useState(false)

async function mySubmit (values){
  console.log(values);
  
  setIsLoading(true)

  const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)
  // console.log(res.data);
  .then( (x)=>{
    // console.log("in case succses:" , x);
    setisSuccses(true)
    setTimeout(function(){
      setisSuccses(false)
      myNavigate("/products")
    },2000 )
    setIsLoading(false)

  })
  .catch( (err)=>{
    // console.log("in case of error:" , err.response.data.message);
    setErrMessage(err.response.data.message);
    setTimeout(function(){
      setErrMessage(false)
    },2000 )
    setIsLoading(false)
  })


}

const myFormik = useFormik({
  initialValues: userData, 
  onSubmit: mySubmit, 

validate: function(values){

const errors = {};

const nameRegex = /^[A-Z][a-z]{3,8}$/
const phoneRegex = /^01[0125][0-9]{8}$/
if(nameRegex.test(values.name)===false){
errors.name = "Name must be from 3 to 8 characters starts with capital letter"
}

if (values.email.includes("@") !== true || values.email.includes(".") !== true ){
  errors.email = "Email must be in format"
}

if(phoneRegex.test(values.phone)===false){
  errors.phone = "Phone must be an Egyptian number"
  }

if(values.password.length < 6 || values.password.length > 12){
  errors.password = "password must be from 6 to 12"
}
if(values.rePassword !== values.password){
  errors.rePassword = "password does not match repassword"
}

  return errors
}


// validationSchema:mySchema

})



  return <>
  
  <div className='w-75 m-auto p-5' >
    {isSuccses ? <div className='alert alert-success text-center' >congratulation your account has been created</div> : '' }
    {errMessage ? <div className='alert alert-danger text-center' >{errMessage}</div> : ""}
    <h2>Register Now :</h2>
    <form onSubmit={myFormik.handleSubmit} >
    <label htmlFor="name">Name:</label>
    <input  onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="text" className='form-control mb-3' placeholder='Enter your name' id='name' value={myFormik.values.name} />
    {myFormik.errors.name && myFormik.touched.name ? <div className='alert-danger alert' >{ myFormik.errors.name }</div> : ""}
    <label htmlFor="email">Email:</label>
    <input onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} type="email" className='form-control mb-3' placeholder='Enter your email' id='email' value={myFormik.values.email} />
    {myFormik.errors.email && myFormik.touched.email? <div className='alert-danger alert' >{ myFormik.errors.email }</div> : ""}
    <label htmlFor="phone">Phone:</label>
    <input onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} type="text" className='form-control mb-3' placeholder='Enter your phone' id='phone' value={myFormik.values.phone}/>
    {myFormik.errors.phone && myFormik.touched.phone ? <div className='alert-danger alert' >{ myFormik.errors.phone }</div> : ""}
    <label htmlFor="password">Password:</label>
    <input onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} type="password" className='form-control mb-3' placeholder='Enter your password' id='password' value={myFormik.values.password}/>
    {myFormik.errors.password && myFormik.touched.password ? <div className='alert-danger alert' >{ myFormik.errors.password }</div> : ""}
    <label htmlFor="rePassword">rePassword:</label>
    <input onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} type="password" className='form-control mb-3' placeholder='Enter your Password again' id='rePassword' value={myFormik.values.rePassword}/>
    {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className='alert-danger alert' >{ myFormik.errors.rePassword }</div> : ""}

<button type='submit' className='btn bg-main text-white p-2 rounded-3 ' >

  { isLoading ? <Circles
  height="35"
  width="35"
  color="#fff"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  /> : "Register" }

  </button>
    </form>

  </div>
  
  
  
  
  
  
  </>
}
