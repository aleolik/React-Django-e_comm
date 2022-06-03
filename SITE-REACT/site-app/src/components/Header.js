import React, { useState,createContext, useEffect, useRef} from 'react'
import { Link, Outlet } from 'react-router-dom'

import {useContext} from 'react'

import {NavLink} from 'react-router-dom'

import axiosInstance from '../axiosinstance'

import { AuthContext }  from '../context/AuthProvider'
import useAuth from '../hooks/useAuth'

import { AxiosPrivate } from '../axiosinstance'

import { Navigate } from 'react-router-dom'

import Mymodal from '../components/Mymodal'

import SignIn from '../pages/Registrtation'

import RenderPosts from './RenderPosts'
import { IconButton, setRef, Toolbar, Typography } from '@mui/material'

import cl from '../components/css/Header.module.css'

import {GrClose} from 'react-icons/gr'

import logo from '../static/logo.png'


import { AppBar } from '@mui/material'

import LogoutIcon from '@mui/icons-material/Logout';
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


  
  return (
    <AppBar position="static">
        <Toolbar>
          <Typography
          variant='h6'
          component="span"
          sx = {{ flexGrow : 1}}
          >
          Navbar
          </Typography>
          <IconButton
            color='inherit'
          >
            <LogoutIcon></LogoutIcon>
          </IconButton>
        </Toolbar>
    </AppBar>
  )
}

export default Header

