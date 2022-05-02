
// This is Main Page of the site

// Home page is a page with posts (/posts)


import React, { useState } from 'react'

import photo from '../static/background.jpg'

import Mymodal from '../components/Mymodal'

import SignIn from '../pages/Registrtation'
const Main = () => {
  const [modal,SetModal] = useState(false)

  const OpenModal = () => {
    SetModal(true)
  }
  return (
    <div className='has-bg-img'>
        <button className='btn btn-warning' style={{'width':100+'%'}} onClick={() => OpenModal()}>Register Now</button>
        <Mymodal modal={modal} SetModal={SetModal}>
            <SignIn/>
        </Mymodal>
        <img src={photo} class="img-fluid" alt="Responsive image"></img>
    </div>
  )
}

export default Main