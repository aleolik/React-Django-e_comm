import axios from 'axios'

import React from 'react'

import useAuth from './useAuth'

import axiosInstance from '../axiosinstance'




const useRefreshToken = () => {
  // function that works 1 time in userPersistLogin
  const { setAuth } = useAuth()
  const {auth} = useAuth()

  const old_refresh_token = localStorage.getItem('refresh_token') || ''

  // link that change refresh and access tokens
  const url = 'token/refresh/'

  const refresh = async() => {
    if (old_refresh_token){
      try{
        const response = await axiosInstance.post(url,{
          refresh : old_refresh_token,
          withCredentials:true
        })
        const access_token = response.data.access
        const new_refresh_token = response.data.refresh
        localStorage.setItem('refresh_token',new_refresh_token)
        setAuth(prev => {
          return {...prev,access_token:access_token,refresh_token:new_refresh_token}
        })
        return access_token
      }
        catch(e){
          console.error('Error : ' + e)
      }
    }
  }
  return refresh
}

export default useRefreshToken


