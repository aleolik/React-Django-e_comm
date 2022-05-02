import React, { useEffect, useState } from 'react'

import axios from 'axios'

import CategoryItem from './CategoryItem'
const Categories = (props) => {
  let [categories,Setcateogries] = useState([])

  
  const SetCurrentCategory = props.SetCurrentCategory

  const url = `http://127.0.0.1:8000/getlistcategories/`
  useEffect(() => {
    const GetCats = async() => {
        await axios.get(url).then((response) => {Setcateogries(response.data)})
        return categories
    }
    GetCats()
  },[])
  return(
    <div>
      {categories.map((category) => {
        return(
          <div key={category.id}>
            <CategoryItem category={category} SetCurrentCategory={SetCurrentCategory}/>
          </div>
        )
      })}
    </div>
  )
}

export default Categories