import { AxiosPrivate } from "../axiosinstance";


import React from 'react'


import { useEffect } from "react";

import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import axios from "axios";
const useAxiosPrivate = () => {
  
  const refresh = useRefreshToken()

  const { SetAuth } = useAuth()

  const {auth} = useAuth()
  useEffect(() => {
    const RequestInterceptior = AxiosPrivate.interceptors.request.use(
      config => {
        if(auth.access_token) {
          config.headers['Authorization'] = `JWT ${auth.access_token}`
          const url = 'token/access_data/'
          try{
          const data = AxiosPrivate(url,{
            access_token : auth.access_token
          })
          const email = data.email
          const user_name = data.user_name
          SetAuth({user_name:user_name,email:email})
        }
          catch(err){
            console.error(err)
          }  
        }
      },(error) => Promise.reject(error)
    )
    const ResponseInterceptor = AxiosPrivate.interceptors.response.use(
        response => response,
        async(error) => {
          const PrevRequest = error?.config
          if (error?.response?.status === 403 && !PrevRequest.sent){
            PrevRequest.sent = true
            const RefreshTokens = refresh()
            PrevRequest.headers['Authorization'] = `JWT ${auth.access_token}`
            return AxiosPrivate(PrevRequest)
          }
          return Promise.reject(error)
        }
      )
      return () => {
        axios.interceptors.request.eject(RequestInterceptior)
        axios.interceptors.request.eject(ResponseInterceptor)
      }
  },[auth])
  return AxiosPrivate
}

export default useAxiosPrivate
