import axios from 'axios'

import React from 'react'

import useAuth from './useAuth'

import axiosInstance from '../axiosinstance'


const useRefreshToken = (PrevToken) => {
  const { setAuth } = useAuth()

  const { auth } = useAuth()

  const url = 'token/refresh/'

  const refresh = async() => {
    try{
      const response = await axiosInstance.post(url,{
        refresh : auth.refresh_token,
        withCredentials:true
      })
      setAuth(prev => {
        console.log(response.data)
        localStorage.setItem('access_token',response.data.access)
        localStorage.setItem('refresh_token',response.data.refresh)
        return {...prev,access_token:response.data.access,refresh_token:response.data.refresh}
      })}
      catch(e){
        console.error('Error : ' + e)
      }
  }
  return refresh
}
export default useRefreshToken