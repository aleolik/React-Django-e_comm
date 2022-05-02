import { useContext } from "react";

import { AuthContext } from "../context/AuthProvider";


import React from 'react'

const useAuth = () => {
  return (
    useContext(AuthContext) // returns data from context
  )
}

export default useAuth