import React, { useRef, useState } from 'react'


// компонент для поиска
const Search = () => {

  searchRef = useRef()

  [search,SetSearch] = useState('')
  return (
    <div>Search</div>
  )
}

export default Search