import React, { useEffect, useState } from 'react'

import axios from 'axios'

import CategoryItem from './CategoryItem'
import { Grid } from '@mui/material'
const Categories = (props) => {

  
  const SetCurrentCategory = props.SetCurrentCategory

  const [categories,setCategories] = useState([])

  const url = `http://127.0.0.1:8000/getlistcategories/`
  useEffect(() => {
    const GetCats = async() => {
        await axios.get(url,{
          params : {
            _page : 1,
          }
        }).then((response) => {Setcateogries(response.data.results)})
        setCategories(categories)
    }
    GetCats()
    console.log('cats are',categories)
  },[])

  return(
    categories
  )
}

export default Categories