import React from 'react'
import useAuth from './useAuth'

const useLogout = () => {

  const {setAuth,set_persist_log} = useAuth()

  const useLogout = () => {
    localStorage.removeItem('refresh_token')
    localStorage.removeItem("persist")
    setAuth({})
    set_persist_log(false)
  }
  return useLogout
}

export default useLogout