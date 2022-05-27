import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

import RenderPosts from '../components/RenderPosts'

import axiosInstance from '../axiosinstance'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

import {FaHryvnia} from 'react-icons/fa'

import Loader from '../components/Loader'

import useFetching from '../hooks/useFetching'
const Mygoods = () => {

  const { auth } = useAuth()

  const user_name = auth.user_name || ''


  const url = `get_user_cart/`

  const [CartItems,setCartItems] = useState([])

  const axiosPrivate = useAxiosPrivate()

  const navigate = useNavigate()

  const location = useLocation()

  const [isPostsLoading,setPostsLoading]=  useState(true)

  const [errMsg,SeterrMsg] = useState('')

  const body_length = 50
  useEffect(() => {
      const GetItemInCart = async() => {;
        await axiosPrivate.post(url,{
          user_name:user_name
        }).then((res) => {
          setCartItems(res.data)})
          .catch((err) => {
            console.error(err)
            navigate('/login',{state : {from : location},replace:true})
          })
    }
    const RenderPosts = async() => {
      try{
          await GetItemInCart()
      }
      catch(e){
        SeterrMsg(e.message)
      }
      finally{
          setPostsLoading(false)
      }}
    RenderPosts()

  },[])
  let num_height = 100
  if (!isPostsLoading){
     num_height = 100 + CartItems.length * 15
  }
  return(
    <div className='container-fluid d-flex align-items-center justify-content-center' style={{'height':num_height+'vh','backgroundImage':'linear-gradient(#e66465, #9198e5)'}} >
      {isPostsLoading
      ? (<Loader/>)
      : (CartItems.length > 0
        ? (<div>
          <div style={{'paddingLeft':40+'px'}}>
            <button className='btn btn-warning'>Корзина</button>
            <button className='btn btn-success'>В процессе</button>
            </div>
         {CartItems.map((post) => {
           const post_link = `posts/post/${post.name}`
           return(
            <div className='col' key={post.id}>
            <div key={post.id}>
                <div className='card bg-primary mb-1'>
                <img className="img-card" src={post.photo}alt="is loading..." style={{'maxHeight':250+'px','maxWidth':270+'px'}}/>
                <div className='card-content'><Link to={post_link}><h5 class="card-header" style={{'color':'white'}}>{post.name}</h5></Link>
                    <div className="card-title" style={{'color':'white'}}>
                            { post.body.length > body_length 
                            ?(<div className="card-text" style={{'color':'white','maxHeight':100+'px','maxWidth':200+'px','height':100+'px','width':200+'px'}}><p>{post.body.substring(0,body_length)} ...</p>
                            </div>)
                            :(<div className="card-text" style={{'color':'white','maxHeight':100+'px','maxWidth':200+'px','height':100+'px','width':200+'px'}}><p>{post.body}</p>
                                
                            </div>)
                            }
                    </div>      </div>                  
                    <div className="card-read-more">
                        <h4 className="font-italic">{post.price}<FaHryvnia style={{'width':10+'%','paddingTop':3+'px'}}/></h4>
                        <a href={post_link}><button className='btn btn-info'>Узнать больше</button></a>
                    </div>                          
                </div>
            </div>
          </div>
           )
         })}
        </div>)
        : (  <div>
          <h1>Your cart is empty!</h1>
        </div>) )}
    
    </div>
  )
}

export default Mygoods