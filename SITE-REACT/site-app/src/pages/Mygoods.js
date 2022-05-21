import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

import RenderPosts from '../components/RenderPosts'

import axiosInstance from '../axiosinstance'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
const Mygoods = () => {

  const { auth } = useAuth()

  const user_name = auth.user_name || ''


  const url = `get_user_cart/`

  const [CartItems,setCartItems] = useState([])

  const axiosPrivate = useAxiosPrivate()

  const navigate = useNavigate()

  const location = useLocation()

  useEffect(() => {
    if (user_name){
      const GetItemInCart = async() => {
        await axiosPrivate.post(url,{
          user_name:user_name
        }).then((res) => {
          setCartItems(res.data)})
          .catch((err) => {
            console.error(err)
            navigate('/login',{state : {from : location},replace:true})
          })
    }
    GetItemInCart()
  }
  },[])
  return(
    <div className='container-fluid'>
      {CartItems.length > 0 
      ? (
        <div className='d-flex align-items-center justify-content-center' style={{'backgroundImage':'linear-gradient(#e66465, #9198e5)'}}>
         {CartItems.map((post) => {
           return(
             <div key={post.id} classname='col' style={{'maxWidth':250+'px'}}>
                  <h2>{post.name}</h2>
              </div>
           )
         })}
        </div>
      )
      : (
        <div>
          <h1>Your cart is empty!</h1>
        </div>
      )}
    </div>
  )
}

export default Mygoods