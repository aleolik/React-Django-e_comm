import React from 'react'

const TotalPages = (limit=3,totalposts=[]) => {
   const pages = Math.ceil(totalposts / limit)
   return(
        pages
   )
}

export default TotalPages