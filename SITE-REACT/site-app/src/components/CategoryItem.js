import React from 'react'

import { useState } from 'react'
const CategoryItem = (props) => {
    const category = props.category

    const SetCurrentCategory = props.SetCurrentCategory

    return(
        <div>
            <button className='btn btn-primary' onClick={() => SetCurrentCategory(category.id)}>{category.title}</button>
        </div>
    )
}

export default CategoryItem



