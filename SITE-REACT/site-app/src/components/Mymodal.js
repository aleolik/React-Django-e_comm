import React from 'react'
import cl from '../components/css/Mymodal.module.css'

import SignIn from '../pages/Registrtation'
const Mymodal = ({children,modal,SetModal}) => {

  const rootClases = [cl.Mymodal]

  if(modal){
    rootClases.push(cl.active)
  }

  const closeModal = () => {
    SetModal(false)
    console.log(modal)
  }
  return (
    <div className={rootClases.join(' ')} onClick={() => closeModal()}>
        <div className={cl.MymodalContent} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
    </div>
  )
}

export default Mymodal