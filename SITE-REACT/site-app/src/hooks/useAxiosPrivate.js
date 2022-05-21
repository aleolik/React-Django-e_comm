import { AxiosPrivate } from "../axiosinstance";


import React from 'react'


import { useEffect } from "react";

import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import axios from "axios";

import useLogout from './useLogout'
const useAxiosPrivate = () => {
  
  const refresh = useRefreshToken()

  const { SetAuth } = useAuth()

  const {auth} = useAuth()

  const logout = useLogout()
  
  useEffect(() => {
    const RequestInterceptior = AxiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          config.headers.Authorization=`JWT ${auth?.access_token}`
        }
        console.log(auth?.access_token)
        return config
      },(error) => Promise.reject(error)
    )
    const ResponseInterceptor = AxiosPrivate.interceptors.response.use(
        response => response,
        async(error) => {
          const PrevRequest = error?.config
          if (error?.response?.status === 401 && !PrevRequest.sent){

            console.log('old_token',auth?.access_token)

            PrevRequest.sent = true
            
            const new_access_token = await refresh()
            
            
            if (new_access_token){
                PrevRequest.headers['Authorization'] = `JWT ${new_access_token}`}
            else{
                logout()
            }
            return AxiosPrivate(PrevRequest)
          }
          return Promise.reject(error)
        }
      )
      return () => {
        AxiosPrivate.interceptors.request.eject(RequestInterceptior)
        AxiosPrivate.interceptors.response.eject(ResponseInterceptor)
      }
  },[auth,refresh])
  return AxiosPrivate
}

export default useAxiosPrivate
