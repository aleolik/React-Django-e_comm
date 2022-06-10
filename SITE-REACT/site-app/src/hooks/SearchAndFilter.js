import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosinstance'

const SearchAndFilter = (page=1,url='',user_name='',search='',category='') => {
  if (typeof category === 'object'){
    category = category.title
  }
  const GetData = async() =>{
    try{
      const res = await axiosInstance.get(url,{
        params : {
          page : page,
          search : search,
          category : category,
          user_name : user_name
        }
      })
      return [res.data.count,res.data.results]
    }
    catch(e){
      const res = await axiosInstance.get(url,{
        params : {
          page : 1,
          search : search,
          category : category,
          user_name : user_name
        }
      })
      return [res.data.count,res.data.results]
    }
    // finally{
    //   setisloading(false)
    // }
  }

  return GetData()

}

export default SearchAndFilter