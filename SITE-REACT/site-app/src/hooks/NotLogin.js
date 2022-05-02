import React from 'react'

import useAuth from './useAuth'

import {Outlet,Navigate,Location, useLocation} from 'react-router-dom'
const NotLogin = () => {

  const { auth } = useAuth()
  const { location } = useLocation()
  return (
    auth?.access_token
    ? <Navigate to='/' replace></Navigate>
    : <Outlet></Outlet>
  )
}

export default NotLogin