import { Grid, MenuItem } from '@mui/material'
import React from 'react'

import { useState } from 'react'
const CategoryItem = (props) => {
    const category = props.category

    const SetCurrentCategory = props.SetCurrentCategory

    return(
        <MenuItem defaultValue={category.id} key={category.id}>{category.title}</MenuItem>
    )
}

export default CategoryItem



