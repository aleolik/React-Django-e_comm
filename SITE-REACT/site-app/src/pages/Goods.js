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

import { Box } from '@mui/system'

import photo from '../static/dark_bg.jpg'

import { Button, Grid, TextField } from '@mui/material'

import { Container, width } from '@mui/system'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';



import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const Goods = () => {
    const filter = createFilterOptions();
    const [posts,setPosts] = useState([]);


    let [made_post,Setmadepost] = useState({name : ''
      ,photo : '',body: ''})
    const createPost = () => { // modal window to create new Post(admin or staff only)

    }

    const [SortByTitle,SetSortByTilte] = useState('') // сортировка постов по тайтлу

  // Pagination
  const [Page,setPage] = useState(1)


  const [allPosts,SetallPosts] = useState(0)


  const [CurrentCategory,SetCurrentCategory] = useState('All')

  const [search,SetSearch] = useState('')

  const searchRef = useRef(false)

  const [search_focus,setSearchfocus] = useState(false)

  const [isLoading,SetIsloading] = useState(false)

  const [errMsg,seterrMsg] = useState('')


  const [allPages,setallPages] = useState(0)

  const [limit,setlimit ] = useState(12) // needs to be same as in settings

  let categories_titles = ['All']

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

    const [sortBox,setsortBox] = useState(false)
    // временный массив для useMemo
    const [SortedPosts,setSortedPosts] = useState([])


    // массив,который кэшируется в памяти , выполняется при изменений категории.
    useEffect(() => {
      // не категории,ни сёрч
      if (CurrentCategory === 'All' && search.length < 3){
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
      else if(CurrentCategory && search.length<=2){
        // Сортируем по категории
        const GetPostsByCats = async() => {
          const url = `posts_by_categories/`
          // нужен айди а не тайтл
          const res = await SearchAndFilter(Page,url,'','',CurrentCategory)
          await changePosts_and_allPosts (res[1],res[0])
        }
        GetPostsByCats()
       }
       // еслт поиск и категории выбраны
       else if((CurrentCategory && search.length>2) && CurrentCategory !== 'All'){
        const GetPostsByCats = async() => {
          const res = await SearchAndFilter(Page,'posts_by_category_and_search/','',search,CurrentCategory)
          await changePosts_and_allPosts (res[1],res[0])
        }
        GetPostsByCats()
       }
       // если поиск,но категории не выбраны
       else if (search.length > 2 && CurrentCategory === 'All'){
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

    const [categories,setcategories] = useState([])
    useEffect(() => {
      const url = `getlistcategories/`
      const GetCats = async() => {
          await axiosInstance.get(url,{
            params : {
              _page : 1,
            }
          }).then((response) => {setcategories(response.data.results)})
      }
      GetCats()
    },[])

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

  const layout_height = 100 + 5 * SortedPosts.length


  const [search_category_input,set_search_category_input] = useState('')

  const ChangeCurrentCategory =  (e) => {
    SetCurrentCategory(e.target.value)
  }
  return (
    <div  style={{'backgroundImage':`url(${photo})`,'height':layout_height+'vh'}}>
      {isLoading 
      ? (<div className='d-flex align-items-center justify-content-center' style={{'paddingTop':20+'%'}}><Loader/></div>)
      : (
        <div>
              <Container>
                <div>
                    {categories.map((category) => {
                        const title = category.title
                        categories_titles.push(title)
                    })}
                    <Button endIcon={<ArrowDropDownIcon/>}  onClick={() => {setsortBox(!sortBox)}} className='btn-selfmade-blue'><span>Сортировать по:</span><i></i></Button>
                        {sortBox && (
                        <div style={{'width':100+'%','backgroundColor':'white','height':190+'%'}}>
                          <h2 style={{'fontFamily':'Impact, fantasy'}}>По категориям :</h2>
                          <Autocomplete
                            key={'All'}
                            value={CurrentCategory}
                            onChange={(event,new_category_value) => {
                              if (new_category_value){
                                SetCurrentCategory(new_category_value);
                              }
                              else{
                                SetCurrentCategory('All');
                              }
                            }}
                            inputValue={search_category_input}
                            onInputChange={(event,new_category_value) => {
                              set_search_category_input(new_category_value);
                            }}
                            id="controllable-states-demo"
                            options={categories_titles}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Categoies" />}
                          />
                        </div>
                      )}
                      <input class="form-control mr-sm-2"  type="search" placeholder="Type at least 3 symbols"
                      onChange={(e) => SetSearch(e.target.value)}
                      ref={searchRef}
                      onFocus = {() => setSearchfocus(true)}
                      onBlur = {() => setSearchfocus(false)}
                      />
                </div>
                <Grid sx={{paddingTop : '1%'}}>
                  <RenderPosts setPage={setPage} posts={SortedPosts} search={search} page={Page} allPages={allPages} SetCurrentCategory={SetCurrentCategory} />
                </Grid>
              </Container>
        </div>
      )}
  </div>
  
  )
}

export default Goods





// <Autocomplete
//                           value={CurrentCategory}
//                           onChange={(event, newValue) => {
//                             if (typeof newValue === 'string') {
//                               SetCurrentCategory({
//                                 newValue,
//                               });
//                             } else if (newValue && newValue.inputValue) {
//                               SetCurrentCategory(
//                                 newValue.inputValue,
//                               );
//                             } else {
//                               SetCurrentCategory(newValue);
//                             }
//                           }}
//                           filterOptions={(options, params) => {
//                             const filtered = filter(options, params);
//                             const { inputValue } = params;


//                             const isExisting = options.some((option) => inputValue === option);

//                             if (inputValue !== '' && !isExisting) {
//                               console.log(inputValue,isExisting)
//                               console.log(filtered)
//                               filtered.push({
//                                 id : -1,
//                                 title : `Nothing found to serach ${inputValue}`
//                               })
//                               filtered.title = `Nothing found to serach ${inputValue}`
//                             }

//                             return filtered;
//                           }}
//                           selectOnFocus
//                           clearOnBlur
//                           handleHomeEndKeys
//                           id="filter-search-category"
//                           options={categories}
//                           getOptionLabel={(option) => {
//                             // Value selected with enter, right from the input
//                             if (typeof option === 'string') {
//                               return option;
//                             }
//                             // Add "xxx" option created dynamically
//                             if (option.inputValue) {
//                               return option.inputValue;
//                             }
//                             // Regular option
//                             return option.title;
//                           }}
//                           renderOption={(props, option) => <li {...props}>{option.title}</li>}
//                           sx={{ width: 300 }}
//                           freeSolo
//                           renderInput={(params) => (
//                             <TextField {...params} label="Categories" />
//                           )}
//                         />