import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import axiosInstance from '../axiosinstance'
import useAuth from './useAuth'
import useLogout from './useLogout'
import useRefreshToken from './useRefreshToken'
const UsePersistLogin = () => {
  const {auth,persist_log,set_persist_log} = useAuth()

  const {setAuth} = useAuth()

  const [isLoading,SetIsLoading] = useState(true)
  
  const refresh = useRefreshToken()

  const logout = useLogout()

  const get_data = async(access_token='') => {
    const url = `token/access_data/`
    const res = await axiosInstance.post(url,{
      "access_token" :access_token,
    })
    const user_name = res.data.user_name

    const email = res.data.email

    setAuth(prev => {
      return{...prev,user_name:user_name,email:email}
    })
  }
  useEffect(() => {
      let isMounted = true

      const AutoLogin = async() => {
        try{
            let access_token = await refresh()
            if (access_token){
              await get_data(access_token=access_token)
            }
            if (persist_log && !access_token){
              logout()
            }
            if(!persist_log){
              logout()     
            }
        }
        catch(err){
            console.error(err)
        }
        finally{
            isMounted && SetIsLoading(false)
        }
      }
      !auth?.access_token
      ? (
        AutoLogin()
      )
      : SetIsLoading(false)

      return () => isMounted = false
  },[])
  return(
    <>
      {!persist_log ? <Outlet/>
                    : isLoading 
                      ? <p>Loading...</p>
                      : <Outlet/>}
      </>
  )
}

export default UsePersistLogin