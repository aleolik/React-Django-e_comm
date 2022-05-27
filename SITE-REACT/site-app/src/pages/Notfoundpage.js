import React, { useEffect } from 'react'

import error_image from '../static/error.png'

const Notfoundpage = () => {
  return (
    <div  style={{'backgroundImage':'linear-gradient(#e66465, #9198e5)','height':"100vh"}}>
       <img src={error_image} class="img-fluid" alt="Responsive image" className='center-error-img'></img>
    </div>
  )
}

export default Notfoundpage