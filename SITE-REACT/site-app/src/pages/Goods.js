import React, { useEffect, useMemo, useState,useRef} from 'react'

import axios from 'axios'

import photo from '../static/background.jpg'

import useAuth from '../hooks/useAuth'

import Categories from '../components/Categories'

import RenderPosts from '../components/RenderPosts'

import Mymodal from '../components/Mymodal'

import SignIn from './Registrtation'

import axiosInstance from '../axiosinstance'

import Loader from '../components/Loader'

import PaginationSelector from '../components/PaginationSelector'

import TotalPages from '../components/TotalPages'
const Goods = () => {

    const [posts,setPosts] = useState([]);


    let [made_post,Setmadepost] = useState({name : ''
      ,photo : '',body: ''})
    const createPost = () => { // modal window to create new Post(admin or staff only)

    }

    const [SortByTitle,SetSortByTilte] = useState('') // сортировка постов по тайтлу

  // Pagination
  const [Page,setPage] = useState(1)


  const [allPosts,SetallPosts] = useState(0)



  const [CurrentCategory,SetCurrentCategory] = useState('')

  const [search,SetSearch] = useState('')

  const searchRef = useRef(false)

  const [search_focus,setSearchfocus] = useState(false)

  const [isLoading,SetIsloading] = useState(false)

  const [errMsg,seterrMsg] = useState('')


  const [allPages,setallPages] = useState(0)

  const [limit,setlimit ] = useState(25)

  useEffect(() => {
    const PostBefore = async() =>{
      const url = `http://127.0.0.1:8000/getlistofposts/`
        await axios.get(url,{
          params : {
            _page : Page,
          }
        }).then((response) => {
          setPosts(response.data.results)
          SetallPosts(response.data.count)
        })
      }
  const RenderPosts = async() => {
      try{
        SetIsloading(true)
        await PostBefore()
      }
      catch(e){
        seterrMsg('error',e.message)
      }
      finally{
          SetIsloading(false)
      }
    }
  RenderPosts()

  // search and categories temp storage
  },[])


    // массив,который кэшируется в памяти , выполняется при изменений категории.

    
    const SortedPosts = useMemo(() => {
      let new_posts = []
      if(CurrentCategory && search.length<=2){
        // Сортируем по категории
        const url = `posts_by_categories`
        const GetPostsByCats = async() => {
          const res = await axiosInstance.post(url,{
            category : CurrentCategory
          })
          if (res.data.status === 200){
            let posts = res.data
            posts.map((post) => {
              new_posts.push(post)
            })
          }
        }
        try{
          GetPostsByCats()
        }
        catch(e){
          console.error(e)
        }
        finally{
          return new_posts
        }
       }
       if(CurrentCategory && search.length>=3){
        // когда по поиску и категориям
       }
    },[CurrentCategory,posts])
    useEffect(() => {
      const num = TotalPages(limit,allPosts)
      setallPages(num)
      
    },[posts,CurrentCategory])
    useEffect(() => {
      if(search.length >= 3 ){
        const GetPostsBySearch = async() => {
          const url = `search/posts/`
          const res = await axiosInstance.post(url,{
            search:search
          })
          if(res.data.status === 200){ 
            setPosts(res.data)
          }
          else{
            setPosts([])
          }
        }
        GetPostsBySearch()
      }
      else{
        const PostBefore = async() =>{
          if (CurrentCategory){
            const url = `posts_by_categories/`
            const res = await axiosInstance.post(url,{
              category:CurrentCategory
            })
            if (res.data.status === 200){
              setPosts(res.data)
            }
            else{
              setPosts([])
            }
          }
          else{
            const url = `http://127.0.0.1:8000/getlistofposts/`
            try{
              await axios.get(url,{
                params : {
                  _page : Page,
                }
              }).then((response) => {
                setPosts(response.data.results)
              })
            }
            catch(err) {
              console.error('Cant Fetch Posts')}
            }
          }
          PostBefore()
      }
    },[search])

  // const layout_height = 100 + 1 * SortedPosts.length
   const layout_height = 100

  return (
    <div className='container-fluid' style={{'backgroundImage':'linear-gradient(#e66465, #9198e5)','height':layout_height+'vh'}}>
      {isLoading 
      ? (<div className='d-flex align-items-center justify-content-center' style={{'paddingTop':20+'%'}}><Loader/></div>)
      : (
        <div>
        <div className='.col-6 .col-md-4' >
          <div> 
            <button className='btn btn-primary' onClick={() => SetCurrentCategory('')}>All</button>
            <Categories SetCurrentCategory={SetCurrentCategory}/>
          </div>
        </div>
          <div className='content'>
              <div className='container' style={{'paddingTop':3+'%'}}><RenderPosts posts={SortedPosts} search={search} page={Page} allPages={allPages}/></div>
              <div className='container'>
                  <form className="form-inline my-2 my-lg-0">
                      <button className='btn btn-warning'>Соритровать по :</button>
                      <input className="form-control mr-sm-2 " type="search" placeholder="Type at least 3 symbols" aria-label="Search"
                      onChange={(e) => SetSearch(e.target.value)}
                      ref={searchRef}
                      onFocus = {() => setSearchfocus(true)}
                      onBlur = {() => setSearchfocus(false)}
                      />
                  </form>
              </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default Goods
