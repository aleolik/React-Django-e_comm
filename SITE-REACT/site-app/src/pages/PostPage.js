import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import Notfoundpage from './Notfoundpage'

import axiosinstance from '../axiosinstance'

import Header from '../components/Header'
const PostPage = () => {
 const params = useParams() // параметры в url строке
 
 const [post,setpost] = useState({})

 const basemedia = "http://127.0.0.1:8000/media/"
  useEffect(() => {
    try{
        const GetPost = async() => {
            const url = `getlistofposts/`
            const res = await axiosinstance.post(url,{
                'name':params.name
            })
            const data = res.data[0]
            setpost({
                'name':data.name,
                'body':data.body,
                'photo':data.photo,
                'user':data.user,
            })
        }
        GetPost()
    }
    catch(e){
        console.error(e)
        return(
            <Notfoundpage/>
        )
    }
  },[])
  return (
      
    <div key={post.id}>
        <Header/>
        <div className='container'>
            <div>
                <h1 style={{'textAlign':'center'}}>{post.name}</h1>
                <h5>{post.body}</h5>
                <img className="card-img-top" src={basemedia+post.photo} style = {{'width':380+'px','height':  225+'px'}} alt="is loading..."/>
            </div>
        </div>
    </div>
  )
}

export default PostPage