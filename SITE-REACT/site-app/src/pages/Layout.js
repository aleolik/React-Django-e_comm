import React from 'react'
import {Link,Outlet} from 'react-router-dom'
import Header from '../components/Header'

import StickyFooter from '../components/Footer'
const Layout = () => {
  return (
    <div>
      <Header></Header>
      <Outlet/>
    </div>
  )
}

export default Layout