
import AxiosPrivate from '../axiosinstance'

import useAuth from '../hooks/useAuth'

import { useEffect } from 'react'


// const Mylogout = async() => { don't know how to fix but same in Hedaer(userLogout) works
//   const { auth } = useAuth()

//   const { setAuth } = useAuth()

//   const url = 'logout/'


//   try{
//     if (auth.refresh_token){
//     await AxiosPrivate.post(url,{
//       refresh_token : auth.refresh_token})
//     localStorage?.removeItem('access_token')
//     localStorage?.removeItem('refresh_token')
//     setAuth({})
//    }
//     else{
//       console.error('You are not logged in')
//     }
//   }
//   catch(e){
//     console.error(e)
//   }
// }

  

// export default Mylogout