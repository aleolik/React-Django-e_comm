import { useLocation,Navigate,Outlet} from 'react-router-dom'

import React from 'react'

import useAuth from '../hooks/useAuth'

const RequireAuth = () => {
    const {auth} = useAuth()
    
    const location = useLocation()
  return (
   auth.access_token
    ? <Outlet/>
    : <Navigate to='/login' state={{from:location}} replace></Navigate> // checks if user_name is
  )
}

export default RequireAuth


