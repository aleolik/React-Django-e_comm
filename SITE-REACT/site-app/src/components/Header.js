import React, { useState,createContext, useEffect, useRef} from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import {useContext} from 'react'

import {NavLink} from 'react-router-dom'

import axiosInstance from '../axiosinstance'

import { AuthContext }  from '../context/AuthProvider'
import useAuth from '../hooks/useAuth'

import { AxiosPrivate } from '../axiosinstance'


import Mymodal from '../components/Mymodal'

import SignIn from '../pages/Registrtation'

import RenderPosts from './RenderPosts'
import { Button, IconButton, setRef, Toolbar, Typography } from '@mui/material'

import cl from '../components/css/Header.module.css'

import {GrClose} from 'react-icons/gr'

import logo from '../static/logo.png'


import { AppBar } from '@mui/material'

import LogoutIcon from '@mui/icons-material/Logout';

import LoginIcon from '@mui/icons-material/Login';

const Header = () => {

  const [modal,SetModal] = useState(false)

  const OpenModal = () => {
    SetModal(true)
  }
  
  const {setAuth} = useAuth()


  const [render_searched_categories,set_render_searched_categories] = useState(false)

  // global


  const refresh_token = localStorage.getItem('refresh_token') || ''

  const access_token = localStorage.getItem('access_token') || ''

  const { auth } = useAuth()

  // logout comp
  const UserLogout = async() => {
    const url = 'logout/'

    if (auth.access_token && auth.refresh_token){
      await AxiosPrivate.post(url,{
        refresh_token : refresh_token})
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('persist')
      setAuth({})
     }
  }
  let [IsLogged,SetIsLogged] = useState('false')

  const navigate = useNavigate()

  
  return (
    <AppBar position="static">
        <Toolbar>
          <Button
          variant='h6'
          component="span"
          onClick={() => {navigate('/')}}
          >
          Navbar
          </Button>
          <Button
          variant='h6'
          component="span"
          onClick={() => {navigate('/posts')}}
          >
          Goods
          </Button>
          <Button
          variant='h6'
          component="span"
          onClick={() => {navigate('/mygoods')}}
          >
          Mygoods
          </Button>
          {auth?.access_token
          ? (
            <Button
            startIcon={<LogoutIcon/>}
            variant='h6'
            onClick={() => {UserLogout()}}
            sx = {{left :'85%'}}
            component="span">
                Logout
            </Button>
          )
          :(
            <Button
            startIcon={<LoginIcon/>}
            onClick={() => {navigate('/login')}}
            variant='h6'
            sx = {{left :'85%'}}
            component="span">
                Login
            </Button>
          )}

        </Toolbar>
    </AppBar>
  )
}

export default Header

