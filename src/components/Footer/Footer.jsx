import React from 'react'

export default function Footer() {
  return<>
  <div className='footerDesigncolor'>

  <div className='container p-5 ' >
    <div className='footer ' > 
      <h3>Get the freshCart app</h3>
      <p>We will send you a link, open it on your  phone to download the app</p>
    </div>
    <div className='row p-2' >
  
  <div className='col-md-10' >
  <input type="email" placeholder='Email' className='form-control  ' />
  </div>

  <div className='col-md-2' >
  <button className='bg-main btn text-white' >Share App Link</button>
  </div>
</div>

<div className='d-flex justify-content-between' >
<div className='d-flex  align-items-center w-50' >
<p className='mx-3' >Payment Partners</p>

<img className='LogoDesign' src={require("../../images/mastercard-icon-2048x1587-tygju446.png")} alt="mastercard" />
<img className='LogoDesign' src={require("../../images/free-american-express-6-675747.webp")} alt="americanExpress" />
<img className='LogoDesign' src={require("../../images/paypal-icon-2048x547-tu0aql1a.png")} alt="paypal" />
</div>


<div className='d-flex  align-items-center justify-content-center w-50'>
<p className='mx-2' >Get deliveries with FreshCart</p>

<a target='_blank' href="https://play.google.com/store/apps?hl=en&gl=US&pli=1">
<img className='Downloudicon' src={require('../../images/WhatsApp Image 2024-03-02 at 22.21.56_bf50671e.jpg')} alt="googlePlayIcon" />

</a>

<a target='_blank' href="https://www.apple.com/eg/app-store/">
<img className='Downloudicon' src={require('../../images/WhatsApp Image 2024-03-02 at 22.23.37_d00b0285.jpg')} alt="AppStoreIcon" />

</a>

</div>
</div>






  </div>
  </div>


  </>
}


