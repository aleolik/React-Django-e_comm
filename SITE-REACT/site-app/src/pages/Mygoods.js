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

import SearchAndFilter from '../hooks/SearchAndFilter'

import PaginationSelector from '../components/PaginationSelector'

import TotalPages from '../components/TotalPages'


import photo from '../static/goods_bg.jpg'
const Mygoods = () => {

  const { auth } = useAuth()

  let user_name = auth.user_name || ''


  let url = `get_user_cart/`

  const [CartItems,setCartItems] = useState([])

  const axiosPrivate = useAxiosPrivate()

  const navigate = useNavigate()

  const location = useLocation()

  const [isPostsLoading,setPostsLoading]=  useState(true)

  const [errMsg,SeterrMsg] = useState('')

  const [Page,setPage] = useState(1)

  const [count,setcount] = useState(1)

  const body_length = 50

  const limit = 3
  useEffect(() => {
      const GetItemInCart = async() => {
        try{
          const res = await SearchAndFilter(Page,url,user_name)
          setCartItems(res[1])
          setcount(TotalPages(limit,res[0]))
        }
        catch(e){
          console.error(e)
        }
    }
    const RenderPosts = async() => {
      try{
          GetItemInCart()
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
     num_height = 100 + CartItems.length * 20
  }
  return(
    <div className='container-fluid d-flex align-items-center justify-content-center' style={{'height':num_height+'vh','backgroundImage':`url(${photo})`}} >
      {isPostsLoading
      ? (<Loader/>)
      : (CartItems.length > 0
        ? (<div>
          <div style={{'paddingLeft':40+'px','paddingTop':20+'%'}}>
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
                        <a href={post_link}><button className='btn btn-success'>Купить</button></a>
                    </div>                          
                </div>
            </div>
          </div>
           )
         })}
        <PaginationSelector page={Page} setPage={setPage} allPages={count} />
        </div>)
        : (  <div>
          <h1>Your cart is empty!</h1>
        </div>) )}
    
    </div>
  )
}

export default Mygoods