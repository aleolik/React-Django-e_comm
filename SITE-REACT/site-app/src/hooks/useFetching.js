import React, { useState } from 'react'

const useFetching = async(callback) => {
    const [Loading,SetLoading] = useState(false)
    
    const [errMsg,SeterrMsg] = useState('')
    
    const fetching = async () => {
    try{
        SetLoading(true)
        await callback()
    }
    catch (e) {
        SeterrMsg(e.message)
    }
    finally{
        SetLoading(false)
    }
}
    return [fetching,Loading,errMsg]
}

export default useFetching