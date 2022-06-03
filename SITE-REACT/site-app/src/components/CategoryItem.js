import React from 'react'

import { useState } from 'react'
const CategoryItem = (props) => {
    const category = props.category

    const SetCurrentCategory = props.SetCurrentCategory

    return(
        <div>
            <button className='btn-selfmade-blue' onClick={() => SetCurrentCategory(category.id)}><span>{category.title}</span><i></i></button>
        </div>
    )
}

export default CategoryItem



