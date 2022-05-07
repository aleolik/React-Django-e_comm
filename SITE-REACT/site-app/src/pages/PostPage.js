import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import Notfoundpage from './Notfoundpage'

import axiosinstance from '../axiosinstance'

import {GiShoppingCart} from 'react-icons/gi'
const PostPage = () => {
 const params = useParams() // параметры в url строке
 
 const [post,setpost] = useState({})

 const basemedia = "http://127.0.0.1:8000/media/"

 const [result,setresult] = useState(false)

 const [error,seterror] = useState(false)
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
  return (
    <div>
        {result &&
            <div key={post.id}>
                <div className='container'>
                        <div style={{'maxWidth':50+'px'}}>
                            <h1>{post.name}</h1>
                            <h5>{post.body}</h5>
                        </div>
                        <div style={{'maxWidth':500+'px'}}>
                            <img className="card-img-top" src={basemedia+post.photo} alt="is loading..."/>
                        </div>
                        <button className='btn btn-success'>Купить</button>
                        <button className='btn btn-primary'><GiShoppingCart/>Корзина</button>
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