import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

import photo from '../static/background.jpg'

import useAuth from '../hooks/useAuth'

import Categories from '../components/Categories'

import RenderPosts from '../components/RenderPosts'

import Mymodal from '../components/Mymodal'

import SignIn from './Registrtation'
const Goods = () => {

    const [posts,setPosts] = useState([]);


    let [made_post,Setmadepost] = useState({name : ''
      ,photo : '',body: ''})
    const createPost = () => { // modal window to create new Post(admin or staff only)

    }

    const [SortByTitle,SetSortByTilte] = useState('') // сортировка постов по тайтлу



    const [CurrentCategory,SetCurrentCategory] = useState('')

    // Sets posts list from api
    useEffect(() => {
      const PostBefore = async() =>{
        const url = `http://127.0.0.1:8000/getlistofposts/`
        try{
          await axios.get(url).then((response) => {
            setPosts(response.data)
          })
        }
        catch(err) {
          console.error('Cant Fetch Posts')}
        }
        PostBefore()

      },[])
    




    // массив,который кэшируется в памяти , выполняется при изменений категории.
    const SortedPosts = useMemo(() => {
       if(CurrentCategory){
        let new_post = []  // новый временный контэйнер для постов
        posts.map((post) => {
          if(post.category === CurrentCategory){
            new_post.push(post)
          }
        })
        return new_post
       }
       return posts


    },[CurrentCategory,posts])


  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='.col-6 .col-md-4'>
          <div>
            <button className='btn btn-primary' onClick={() => SetCurrentCategory('')}>All</button>
            <Categories SetCurrentCategory={SetCurrentCategory}/>
          </div>
        </div>
        <div className='.col-12 .col-sm-6 .col-md-8'>
            <div className='container'>
              <div className='row'>
                <RenderPosts posts={SortedPosts} />
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Goods
