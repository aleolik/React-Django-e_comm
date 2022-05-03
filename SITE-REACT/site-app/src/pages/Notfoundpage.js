import React, { useEffect } from 'react'

import error_image from '../static/error.png'

const Notfoundpage = () => {
  return (
    <div>
       <img src={error_image} class="img-fluid" alt="Responsive image" style={{'width':50+'%',display:'block','marginRight':'auto','marginLeft':'auto'}}></img>
    </div>
  )
}

export default Notfoundpage