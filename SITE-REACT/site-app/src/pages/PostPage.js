import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import Notfoundpage from './Notfoundpage'

import axiosinstance from '../axiosinstance'

const PostPage = () => {
 const params = useParams() // параметры в url строке
 
 const [post,setpost] = useState({})

 const basemedia = "http://127.0.0.1:8000/media/"

 const [result,setresult] = useState(false)
  useEffect(() => {
    const GetPost = async() => {
        const url = `getlistofposts/`
        const data = await axiosinstance.post(url,{
            'name':params.name
        }).then((res) => res.data[0])
        console.log(data)
        // const data = res.data[0]
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
    try{
        GetPost()
    }
    catch(e){
        console.error('Error catch :'  , e)
        setresult(false)
    }
  },[])
  return (
    <div>
        {result 
        ?(
            <div key={post.id}>
                <div className='container'>
                    <div>
                        <h1 style={{'textAlign':'center'}}>{post.name}</h1>
                        <h5>{post.body}</h5>
                        <img className="card-img-top" src={basemedia+post.photo} style = {{'width':380+'px','height':  225+'px'}} alt="is loading..."/>
                    </div>
                </div>
            </div>
        )
        : <Notfoundpage/> }
    </div>
    )
}

export default PostPage