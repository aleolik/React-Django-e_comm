import React from 'react'

const PaginationSelector = (props) => {
  
  const current_page = props.page || 1

  const all_pages = props.allPages || 1


  return (
    <nav aria-label="Page navigation example" style={{'paddingRight':20+'%','paddingTop':3+'%'}}>
     <ul class="pagination justify-content-center">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
                <a class="page-link" href="#" aria-disabled="true">{current_page-2}</a>
            <li  className="page-item"><a class="page-link" href="#">{current_page-1}</a></li>
            <li  className="page-item disabled"><a class="page-link" href="#">{current_page}</a></li>
            <li  className="page-item"><a class="page-link" href="#">{current_page+1}</a></li>
                <a class="page-link" href="#">{current_page+2}</a>
                <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
        </ul>     
    </nav>
  )
}

export default PaginationSelector