import React, { useEffect } from 'react'
import Payment from './Payment'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
const Paypal = (props) => {

  const posts = props.posts

  const sum = props.sum
  
  const price = props.price

  return (
      <Payment sum={sum} posts={posts} price={price}/>
  )
}

export default Paypal