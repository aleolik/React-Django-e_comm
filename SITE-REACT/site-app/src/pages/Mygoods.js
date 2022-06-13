import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

import RenderPosts from '../components/RenderPosts'

import axiosInstance from '../axiosinstance'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'


import Loader from '../components/Loader'

import useFetching from '../hooks/useFetching'

import SearchAndFilter from '../hooks/SearchAndFilter'

import PaginationSelector from '../components/PaginationSelector'

import TotalPages from '../components/TotalPages'


import photo from '../static/dark_bg.jpg'

import { Container,Grid,Card,CardMedia,CardContent,Typography,CardActions, Button } from '@mui/material'

import Paypal from '../Paypal/Paypal'

import { Checkbox } from '@mui/material'

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';

import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';

import InputBase from '@mui/material/InputBase';

import MenuIcon from '@mui/icons-material/Menu';

import SearchIcon from '@mui/icons-material/Search';

import {FaDollarSign} from 'react-icons/fa'

import {CgCloseR} from 'react-icons/cg'

const Mygoods = () => {

  const { auth } = useAuth()

  const user_name = auth.user_name || ''

  const [CartItems,setCartItems] = useState([])

  const axiosPrivate = useAxiosPrivate()

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const navigate = useNavigate()

  const location = useLocation()

  const [isPostsLoading,setPostsLoading] = useState(true)

  const [errMsg,SeterrMsg] = useState('')

  const [Page,setPage] = useState(1)

  const [selectedPosts,setselectedPosts] = useState([])

  const [totalPages,setTotalPages]  = useState(1)

  const body_length = 50

  const limit = 12
  
  const [count,setCount] = useState(0)

  const [searchitems,setsearchitems] = useState('')

  const [sum,setsum] = useState(0)

  const [status,setStatus] = useState('') // может быть пустым,PROCESSING или COMPLETED

  const [orders,setOrders] = useState([])

  const [PostOrders,setPostOrders] = useState([])

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color : 'white'
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const removePagefromSelectedPosts = (post_name) => { 
    return selectedPosts.filter(function(ele){ 
        return ele != post_name; 
    });
  }


  const CheckPosts = (event,post) => {
    const checked = event.target.checked
    if (checked){
      setselectedPosts([...selectedPosts,post.name])
      const price = parseInt(post.price)
      setsum(sum+price)
    }
    else{
      setselectedPosts([...removePagefromSelectedPosts(post.name)])
      const price = parseInt(post.price)
      setsum(sum-price)
    }
  }

  useEffect(() => {
      const GetItemInCart = async() => {
        let url = `get_user_cart/`
        setPostsLoading(true)
        const res = await SearchAndFilter(Page,url,user_name)
        setCartItems(res[1])
        setTotalPages(TotalPages(limit,res[0]))
        setPostsLoading(false)
        setCount(res[0])
    }
    const RenderPosts = async () => {
      if (!status){
        try{
          GetItemInCart()
          setOrders(null)
        }
        catch(e){
          console.error(e)
        }
        finally{
          setPostsLoading(false)
        }
      }
    }
    RenderPosts()
  },[Page,status])
  let height = 100 + CartItems.length * 9


  useEffect(() => {
    if (status === 'PROC'){
      const url = `get-orders-in-processing/`
      const GetOrdersInProcessing = async () => {
        const res = await axiosInstance.get(url,{
          params : {
            user_name : auth?.user_name
          }
        })
        // получение всех ордеров
        const temp_orders = res.data.orders
        console.log(temp_orders)
        setOrders(temp_orders)
        setPostOrders(res.data.posts)
      }
      try{
        GetOrdersInProcessing()
      }
      catch(e){
        console.error(e)
      }

    }
  },[status])

  const SelectAll = async () =>{
    // do later
  }

  /* 
    TODO tomorrow :
      1)Search Bar
      2) Deleting item
      3)Bug fixes (checkbox when approved,router to the item in processing) * 
  */
  return(
    <div style={{'height':height+'vh','backgroundImage':`url(${photo})`}} >
          {isPostsLoading
          ? (<div className='d-flex align-items-center justify-content-center' style={{'paddingTop':20+'%'}}><Loader/></div>)
          : (<Container>
            {!status && (
              <div className='d-flex align-items-center justify-content-center'>
                <Paypal posts={selectedPosts} price={sum} setsum={setsum} setselectedPosts={setselectedPosts}/>
              </div>
            )}
            <div className='d-flex align-items-center justify-content-center'>
              {selectedPosts.length === count && !status && (
                (<Button variant="outlined">Выбрано : Все</Button>)
              )}
              {selectedPosts.length !== count && !status && 
              (<Button variant="outlined">Выбрано : {selectedPosts.length}</Button>)}
              {status && 
                (<Button variant="outlined" onClick={() => {setStatus('')}} sx={{'left':20+'px'}}>Показать Корзину</Button>)
              }
              <Button></Button>
              <Button variant="outlined" color='warning' onClick={() => {setStatus('PROC')}}>В процессе</Button>
              <Button variant="outlined" color='success' onClick={() => {setStatus('CMPL')}}>Купленные Товары</Button>
              {!status && (
                <Button variant='outlined' color='info' onClick={() => SelectAll()}>Выбрать Все</Button>
              )}
                    <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                </Typography>
                <Search
                    >
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
            </div>
             {orders 
             ? (<div>
                {orders.map((order) => {
                  return(
                    <Container sx={{'backgroundColor':'white'}}>
                        <div key={order.id}>
                          {PostOrders.map((PostOrder) => {
                          if (order.post.includes(PostOrder.id)){
                            return(
                              <div key={PostOrder.id}>                            
                                <h6>{PostOrder.name}</h6>
                              </div>
                            )
                          }                                               
                          })}
                        </div>
                        <hr style={{'paddingBottom':20+'px'}}></hr>
                         <h6>Order was made : {order.time_created.slice(0,10)} in {order.time_created.slice(11,19)}</h6>
                        <h6 style={{'paddingBottom':3+'%'}}>Price of the order :{order.price}<FaDollarSign/></h6>
                    </Container>
                  ) 
                })}
              </div>
             )
             : ( <Grid  container spacing={2}>
              {CartItems.map((post) => {    
                return(
                     <Grid item  md={4}  xs={12} key={post.id}>
                         <Card sx={{height:'100%'}}>
                             <CardMedia
                             component="img"
                             src = {post.photo}
                             alt = {post.name}
                             title = {post.name}
                             sx = {{height : 400}}
                             />
                             <CardContent>
                                 <Typography
                                 variant = "h6"
                                 component = "h3"
                                 >
                                     {post.name}
                                 </Typography>
                                 <Typography variant='body1'>Цена : {post.price}<FaDollarSign/></Typography>
                             </CardContent>
                             <CardActions>
           
                             {selectedPosts.includes(post.name)
                               ? (
                                 <Checkbox {...label} checked  onChange={() => {CheckPosts(event,post)}} />
                               )
                               : (<Checkbox {...label}  onChange={() => {CheckPosts(event,post)}} />)}        
                               <div style={{'position':'relative','left':70+'%'}}><CgCloseR style={{'color':'red','width':25+'px','height':25+'px'}} onClick={() => {console.log('del item')}}/> </div>      
                             </CardActions>
                         </Card>
                     </Grid>
                )
              })}                    
              </Grid>)}
              {CartItems.length > 0 && totalPages > 1   && (
                <PaginationSelector page={Page} setPage={setPage} allPages = {totalPages}/>
              )}
          </Container>)}
    </div>  
  )
}

export default Mygoods


