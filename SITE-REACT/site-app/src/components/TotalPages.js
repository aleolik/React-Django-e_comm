import React from 'react'

const TotalPages = (limit=12,totalposts=[]) => {
   const pages = Math.ceil(totalposts / limit)
   return(
        pages
   )
}

export default TotalPages