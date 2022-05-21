import React, { useEffect, useState } from 'react'

import { Navigate, useLocation, useParams } from 'react-router-dom'

import Notfoundpage from './Notfoundpage'

import axiosinstance from '../axiosinstance'

import useAuth from '../hooks/useAuth'
import {GiShoppingCart} from 'react-icons/gi'
import axiosInstance from '../axiosinstance'

import Mymodal from '../components/Mymodal'

import Login from '../pages/Login'

const PostPage = () => {
 const params = useParams() // параметры в url строке
 
 const [post,setpost] = useState({})

  const basemedia = "http://127.0.0.1:8000/media/"
  const [error,seterror] = useState(false)
  const [result,setresult] = useState(false)

 useEffect(() =>{
    const GetPost = async() => {
        const url = `getlistofposts/`
        const data = await axiosinstance.post(url,{
            'name':params.name
        }).then((res) => res.data[0])
        setpost({
            'name':data.name,
            'body':data.body,
            'photo':data.photo,
            'user':data.user,
        })
        if (data){
            setresult(true)
        }
      }
      GetPost().catch((e) => {
        seterror(true)
      })
  },[])
 const [modal,Setmodal] = useState(false)

 const { auth } = useAuth()

const location = useLocation()


 const Buying = async() => {
     if (auth?.access_token){
        console.log('buying')
     }
     else{
         setGotoLogin(true)
     }
 }

 const [gotoLogin,setGotoLogin] = useState(false)
 const Add_To_Cart = async(post_name='',user_name='') => {
    if (post_name && user_name){
    const url = `add_post_to_cart/`
    await axiosInstance.post(url,{
        post_name:post_name,
        user_name:user_name,
    }).catch((e) => {
        console.error('Error is ',e)
    })}
    else{
        setGotoLogin(true)
    }
 }
  
  let  user_name = auth?.user_name || ''
  return (
    <div>
        {gotoLogin && <Navigate to='/login'></Navigate>}
        {result &&

            <div key={post.id}>
                <Mymodal modal={modal} SetModal={Setmodal}>
                    <Login/>
                </Mymodal>
                <div className=''>
                    <div className='container border'>
                            <div style={{'maxWidth':2000+'px'}} className=''>
                                <h1>{post.name}</h1>
                                <h5>Описание :{post.body}</h5>
                            </div>
                            <div style={{'maxWidth':600+'px'}} className=''>
                                <img className="card-img-top" src={basemedia+post.photo} alt="is loading..."/>
                            </div>
                            <button className='btn btn-success' onClick={() => Buying()}>Купить</button>
                            <button className='btn btn-primary' onClick={() => Add_To_Cart(post.name,user_name=user_name)}><GiShoppingCart/>Корзина</button>
                    </div>
                </div>
            </div>
        }
        {(error && !result) &&
            <Notfoundpage/>
        }

    </div>
    )
}

export default PostPage