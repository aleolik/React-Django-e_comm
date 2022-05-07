import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axiosInstance from '../axiosinstance'

import succes_photo from '../static/succes.png'

import Notfoundpage from '../pages/Notfoundpage'
const ActivateAccPage = () => {

  const params = useParams()

  const user_name = params.user_name

  const [succes,setSucces] = useState(false)

  const [loading,setloading] = useState(false)

  useEffect(() => {
      const ActivateAcc = async() => {
      const url = `activate/user/`
      await axiosInstance.put(url,{
          'user_name':user_name
      }).then((res) => {
          setSucces(true)
          setloading(true)
        })
          .catch((e) => {
          console.error('Sorry,something went wrong...')
          setloading(true)
      })
      }
      ActivateAcc()
  },[])
  return (
    <div>
        {succes && <div>
            <h1 className='succesmsg'>You're account is Activated now!</h1>
            <img src={succes_photo} className='center-succes-img'></img></div>
        }
        {(!succes && loading) &&
        <Notfoundpage/>
        }
        
    </div>
  )
}

export default ActivateAccPage