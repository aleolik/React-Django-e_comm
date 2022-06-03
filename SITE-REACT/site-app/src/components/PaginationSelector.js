import React, { useEffect } from 'react'

import TotalPages from './TotalPages'
const PaginationSelector = (props) => {
  
  const current_page = props.page || 1

  const all_pages = props.allPages || 1

  const setPage = props.setPage


  console.log(all_pages)
  

  return (
    <nav aria-label="Page navigation example" style={{'paddingRight':20+'%','paddingTop':3+'%'}}>
     <ul class="pagination justify-content-center">
           {current_page - 3 > 0 && (
            <a class="page-link" href="#" aria-label="Previous" onClick={() => setPage(current_page-3)}>
              <span aria-hidden="true">&laquo;</span>
            </a>
           )}
            {current_page - 2 > 0 && (
              <li  className="page-item"><a class="page-link" href="#" onClick={() => setPage(current_page-2)}>{current_page-2}</a></li>
            )}
            {current_page - 1 > 0 && (
              <li  className="page-item"><a class="page-link" href="#" onClick={() => setPage(current_page-1)}>{current_page-1}</a></li>
            )}
            <li  className="page-item disabled"><a class="page-link" href="#" onClick={() => setPage(current_page)}>{current_page}</a></li>
            {current_page + 1 <= all_pages && (
              <li  className="page-item"><a class="page-link" href="#" onClick={() => setPage(current_page+1)}>{current_page+1}</a></li>
            )}
             {current_page + 2 <= all_pages && (
              <li  className="page-item"><a class="page-link" href="#" onClick={() => setPage(current_page+2)}>{current_page+2}</a></li>
            )}
            {current_page + 3 <= all_pages && (
              <a class="page-link" href="#" aria-label="Next" onClick={() => setPage(current_page+3)}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            )}
        </ul>     
    </nav>
  )
}

export default PaginationSelector