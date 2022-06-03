import React, { useEffect, useMemo, useState,useRef} from 'react'

import axios from 'axios'

import useAuth from '../hooks/useAuth'

import Categories from '../components/Categories'

import RenderPosts from '../components/RenderPosts'

import Mymodal from '../components/Mymodal'

import SignIn from './Registrtation'

import axiosInstance from '../axiosinstance'

import Loader from '../components/Loader'

import PaginationSelector from '../components/PaginationSelector'

import TotalPages from '../components/TotalPages'

import SearchAndFilter from '../hooks/SearchAndFilter'

import photo from '../static/dark_bg.jpg'
import { TextField } from '@mui/material'
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

  const [limit,setlimit ] = useState(3) // needs to be same as in settings

  const changePosts_and_allPosts = async(results=[],count=1) => {
   SetallPosts(count)
   setSortedPosts(results)
  }
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
      // не категории,ни сёрч
      if (!CurrentCategory && search.length <= 3){
        const GetDataMainPage = async () => {
          const res = await SearchAndFilter(Page,'getlistofposts/','','','',SetIsloading)
          await changePosts_and_allPosts(res[1],res[0])
        }
        try{
          GetDataMainPage()
        }
        catch(e){
          console.error(e)
        }
      }
      // если категории выбраны
      if(CurrentCategory && search.length<=2){
        // Сортируем по категории
        const GetPostsByCats = async() => {
          const res = await SearchAndFilter(Page,'posts_by_categories/','','',CurrentCategory)
          await changePosts_and_allPosts (res[1],res[0])
        }
        GetPostsByCats()
       }
       // еслт поиск и категории выбраны
       if(CurrentCategory && search.length>2){
        const GetPostsByCats = async() => {
          const res = await SearchAndFilter(Page,'posts_by_category_and_search/','',search,CurrentCategory)
          await changePosts_and_allPosts (res[1],res[0])
        }
        GetPostsByCats()
       }
       // если поиск,но категории не выбраны
       if (search.length >= 3 && !CurrentCategory){
         const GetDatabySearch = async() => {
           const url = `http://127.0.0.1:8000/search/posts/`
           const res = await axiosInstance.get(url,{
             params : {
               search : search,
               page : Page
             }
          })
          if (res.status === 200){
            await changePosts_and_allPosts(res.data.results,res.data.count)
            }
          else{
            await changePosts_and_allPosts()
          }
         }
         GetDatabySearch()
       }
    },[CurrentCategory,posts,Page])


   useEffect(() => {
      const ChangePaginationSelection = async() => {
        setPage(1)
        const num = TotalPages(limit,allPosts)
        setallPages(num)
      }
      ChangePaginationSelection()
    },[allPosts])


    useEffect(() => {
      if(search.length >= 3 ){
        const GetPostsBySearch = async() => {
          const url = `search/posts/`
          const res = await axiosInstance.get(url,{
            params : {
              search : search
            }
          }).catch((e) => {
            setPosts([])
            console.error(e, '-errrrrr')
          })
          if (res.status === 200){
            setPosts(res.data.results)
            SetallPosts(res.data.count)
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

  const layout_height = 100 + 2 * SortedPosts.length

  return (
    <div className='container-fluid' style={{'backgroundImage':`url(${photo})`,'height':layout_height+'vh'}}>
      {isLoading 
      ? (<div className='d-flex align-items-center justify-content-center' style={{'paddingTop':20+'%'}}><Loader/></div>)
      : (
        <div>
        <div className='.col-6 .col-md-4' >
          <div> 
            <button className='btn-selfmade' onClick={() => SetCurrentCategory('')}><span>All</span><i></i></button>
            <Categories SetCurrentCategory={SetCurrentCategory}/>
          </div>
        </div>
          <div className='content'>
              <div className='container' style={{'paddingTop':3+'%'}}><RenderPosts setPage={setPage} posts={SortedPosts} search={search} page={Page} allPages={allPages} /></div>
              <div className='container'>
                  <form className="form-inline my-2 my-lg-0">
                      <button className='btn btn-warning'>Соритровать по :</button>
                      <TextField  label='search' variant='outlined' type="search" placeholder="Type at least 3 symbols" aria-label="Search"
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
