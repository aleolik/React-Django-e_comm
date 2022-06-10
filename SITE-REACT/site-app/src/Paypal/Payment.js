
import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useEffect, useRef, useState } from 'react'

import ReactDOM from "react-dom"

import toast, { Toaster } from 'react-hot-toast'

import axiosInstance from '../axiosinstance';

import useAuth from '../hooks/useAuth';

const Payment = (props) => {

  const posts =  props.posts || []

  const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

  const price = props.price || 0

  const [paypalAproved,setPaypalAproved] = useState(false)
  // Paypal functions 
  
  const {auth} = useAuth()

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price
          },
        },
      ],
    });
  };
  const onApprove = (data,actions) => {
    return actions.order.capture().then(details => {
      console.log(details)
      toast.success("Payment completed,you can check your order in 'В процессе' menu",{
        duration : 7000
      })
      const amount = details.purchase_units[0].amount.value
      const url = `create_new_order/`
      const res = axiosInstance.post(url,{
        price : amount,
        user_name : auth?.user_name,
        post_names : posts
      })
    })
  }

  const onCancel = () => {
    toast.error('You cancelled the payment',{
      duration : 5000
    })
  }

  const onError = () =>{
    toast.error('Something went wrong,please try again',{
      duration : 5000
    })
  }
  
  return (
    <div>
      <Toaster position="top-center"/>
    {price
    ? (<PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onCancel={() => onCancel()}
      onError = {() => {onError()}}
      onApprove = {(data,actions) => {onApprove(data,actions)}}
      >
    </PayPalButton>)
    :(<h2>Sum is 0</h2>)
    }
    </div>
  )
}

export default Payment