import React, { useState,createContext, useEffect, useRef} from 'react'
import { Link, Outlet } from 'react-router-dom'

import {useContext} from 'react'

import {NavLink} from 'react-router-dom'

import axiosInstance from '../axiosinstance'

import { AuthContext }  from '../context/AuthProvider'
import useAuth from '../hooks/useAuth'

import { AxiosPrivate } from '../axiosinstance'

import { Navigate } from 'react-router-dom'



import RenderPosts from './RenderPosts'
import { setRef } from '@mui/material'

const Header = () => {

  const {setAuth} = useAuth()

  const [search,SetSearch] = useState('')

  const searchRef = useRef(false)

  const [search_focus,setSearchfocus] = useState(false)

  // global




  const { auth } = useAuth()

  // logout comp
  const UserLogout = async() => {
    const url = 'logout/'
   
    try{
      if (auth.refresh_token){
      await AxiosPrivate.post(url,{
        refresh_token : auth.refresh_token})
      localStorage?.removeItem('access_token')
      localStorage?.removeItem('refresh_token')
      setAuth({})
      console.log(auth)
     }
      else{
        console.error('You are not logged in')
      }
    }
    catch(e){
      console.error(e)
    }
  }
  let [IsLogged,SetIsLogged] = useState('false')

  const bgcolor = 'card bg-light mb-1'

  
  return (
    <div style={{'backgroundColor':"green"}}>
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <NavLink className="navbar-brand" to="/">Navbar</NavLink>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          {auth.refresh_token ? (
          <div>
              <li className="nav-item">
              <NavLink  className="nav-link" to={<Outlet/>} onClick={UserLogout}>Logout</NavLink>
              </li>
          </div> )
          : (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>)}
          <li className="nav-item">
            <NavLink  className="nav-link" to="/posts" >Goods</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link " to="/about">About us</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='register/' className='nav-link'>Registration</NavLink>
          </li>
          <li className="nav-item" >
            <NavLink className="nav-link" to="/admin">Admin Page</NavLink>
          </li>
          <li className="nav-item" >
            <NavLink className="nav-link" to="/mygoods">My goods</NavLink>
          </li>
          {auth && auth.user_name ? (
            <li className="">
              <h5 className='nav-link'>Hello ,{auth.user_name}</h5>
            </li>
          ) : <></> }
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Type at least 3 symbols" aria-label="Search"
          onChange={(e) => SetSearch(e.target.value)}
          ref={searchRef}
          onFocus = {() => setSearchfocus(true)}
          onBlur = {() => setSearchfocus(false)}
          />
          <button className="btn btn-primary" type="submit" onSubmit={() => console.log('submit')}>Search</button>
        </form>
      </div>
    </nav>
  </div>
  )
}

export default Header

