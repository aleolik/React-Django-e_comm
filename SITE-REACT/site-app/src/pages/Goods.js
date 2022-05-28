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

  },[])




    // временный массив для useMemo
    const [SortedPosts,setSortedPosts] = useState([])


    // массив,который кэшируется в памяти , выполняется при изменений категории.
    useEffect(() => {
      if(CurrentCategory && search.length<=2){
        // Сортируем по категории
        const url = `posts_by_categories/`
        const GetPostsByCats = async() => {
          const res = await axiosInstance.get(url,{
              params : {
                category : CurrentCategory
              }
          })
          if (res.status === 200){
            setSortedPosts(res.data)
          }
          else{
            setSortedPosts([])
          }
        }
        try{
          GetPostsByCats()
        }
        catch(e){
          console.error(e)
        }
       }
       if(CurrentCategory && search.length>=3){
         const url = `posts_by_category_and_search/`
         const GetPostsByCatsAndSearch = async() => {
            const res = await axiosInstance.post(url,{
              search : search,
              category : CurrentCategory
            })
            if (res.status === 200){
              setSortedPosts(res.data)
            }
            else{
              setSortedPosts([])
            }
         }
         try{
           GetPostsByCatsAndSearch()
         }
         catch(e){
           console.error(e)
         }
       }
       if (!CurrentCategory && !search){
        setSortedPosts(posts)
       }
       if (search && !CurrentCategory){
         setSortedPosts(posts)
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
            search : search
          })
          if (res.status === 200){
            setPosts(res.data)
          }
          else{
            setPosts([])
          }
        }
        try{
          GetPostsBySearch()
        }
        catch(e){
          console.error(e)
        }
      }
      else{
        const PostBefore = async() =>{
          const url = `http://127.0.0.1:8000/getlistofposts/`
          const res = await axios.get(url)
          setPosts(res.data.results)
        }
        try{
          PostBefore()
        }
        catch(e){
          console.error(e)
        }
      }
    },[search])

  const layout_height = 100 + 1 * SortedPosts.length

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
