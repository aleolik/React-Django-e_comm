import React, { useEffect } from 'react'

import error_image from '../static/error.png'

const Notfoundpage = () => {
  return (
    <div>
       <img src={error_image} class="img-fluid" alt="Responsive image" className='center-error-img'></img>
    </div>
  )
}

export default Notfoundpage