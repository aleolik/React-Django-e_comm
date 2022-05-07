import React, { useRef, useState } from 'react'


// компонент для поиска
const Search = (props) => {

  searchRef = useRef()

  [search,SetSearch] = useState('')

  searcRef = useRef(false)
  return (
    <div>Search</div>
  )
}

export default Search