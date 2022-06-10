import React, { useEffect, useState } from 'react'

import { Navigate, useLocation, useParams } from 'react-router-dom'

import Notfoundpage from './Notfoundpage'

import axiosinstance from '../axiosinstance'

import useAuth from '../hooks/useAuth'
import {GiShoppingCart} from 'react-icons/gi'
import axiosInstance from '../axiosinstance'

import Mymodal from '../components/Mymodal'

import Login from '../pages/Login'

import photo from '../static/dark_bg.jpg'

import Paypal from '../Paypal/Paypal'

import { Button } from '@mui/material'

import {FaDollarSign} from 'react-icons/fa'
const PostPage = () => {
 const params = useParams() // параметры в url строке
    
 const [show,setShow] = useState(false)

 const [post,setpost] = useState({})

  const basemedia = "http://127.0.0.1:8000/media/"

  const [error,seterror] = useState(false)

  const [result,setresult] = useState(false)

    useEffect(() => {
        const GetPost = async () => {
            const url = `get_single_post/`
            const temp_post = await axiosInstance.get(url,{
                params : {
                    name : params.name
                }
            })
            setpost(temp_post.data)
        }
        try{
            GetPost()
        }
        catch(e){
            console.error(e)
        }
    },[])

    const { auth } = useAuth()

    const location = useLocation()

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
    <div style={{'height':"120vh",'backgroundImage':`url(${photo})`,'paddingBottom':20+'%','color':'white'}} className='container-fluid d-flex align-items-center justify-content-center'>
        {gotoLogin && <Navigate to='/login'></Navigate>}
        <div key={post.id} style={{'border':'5px solid gray'}}>
                <div>
                    <div className>
                            <div style={{'maxWidth':2000+'px'}}>
                                <h1>{post.name}</h1>
                                <h5>Описание :{post.body}</h5>
                            </div>
                            <div style={{'maxWidth':600+'px'}}>
                                <img className="card-img-top" src={post.photo} alt="is loading..."/>
                            </div>
                            <h3>price : {post.price}<FaDollarSign/> </h3>
                            <button className='btn btn-primary' style={{'width':100+'%'}} onClick={() => Add_To_Cart(post.name,user_name=user_name)}><GiShoppingCart/>Корзина</button>
                            <div style={{'paddingTop':2+'%'}}></div>
                             {show
                                ? ( <Paypal price={post.price}/>)
                                : ( <Button sx={{width:'100%'}} variant='contained' color='warning' onClick={() => setShow(true)}>Показать виды оплаты :</Button>)
                             }                            
                    </div>
                </div>
        </div>
    </div>
    )
}

export default PostPage