import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'


import useRefreshToken from '../hooks/useRefreshToken'


import {useNavigate,useLocation } from 'react-router-dom'
const Users = () => {
  const [users,SetUsers] = useState([])

  const { auth } = useAuth()

  const refresh = useRefreshToken()

  const location = useLocation ()

  const AxiosPrivate = useAxiosPrivate()

  const navigate = useNavigate()
  const url = `http://127.0.0.1:8000/list_of_users/`
  useEffect(() => {
    let IsMounted = true
    const controller = new AbortController()

    const GetUsers  = async() => {
      try{
        const response = await axios.get(url,{
          signal : controller.signal})
          IsMounted && SetUsers(response.data);
      }
      catch (err) {
          console.error(err)
      }}
      GetUsers()

    return () => {
      IsMounted = false
      controller.abort()
    }
  },[])
  return (
    <article>
        <h2 style={{'textAlign':'center'}}>Users List:</h2>
        <div>
          {users.map((user) => {
            return(
              <div key={user.id}>
                <h5 style={{'textAlign':'center'}}>{user.id} - {user.user_name}</h5>
              </div>
            )})}
        </div>
        <button onClick={refresh} className='btn btn-primary'>Change tokens</button>
    </article>
  )
}

export default Users