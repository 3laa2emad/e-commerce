import axios from "axios";
import React from "react";
import { MutatingDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {

  function getCategories(){
   return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

 const {data , isLoading} = useQuery('categorySlider' , getCategories )

if(isLoading){

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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>

{data.data.data.map((category , idx)=> <div key={idx} >
   
<img style={{height:'200px'}} className="w-100" src={category.image} alt={category.name} />
<h4>
    {category.name}
    </h4>
  </div>
)}
    </Slider>
  );
}