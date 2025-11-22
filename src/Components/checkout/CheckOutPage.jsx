import React from 'react'
import OrderSummary from './OrderSummary'
import OrderItem from './OrderItem'
import PaymentSection from './PaymentSection'
import useCartData from '../../hooks/useCartData'

const CheckOutPage = () => {
  
    const {cartitems, setCartItems, cartTotal, setCartTotal, cartloading, tax} = useCartData()

  
  
  
    return (
   <div className="container my-3">
    <div className="row">
        <OrderSummary cartitems={cartitems} cartTotal={cartTotal} tax={tax}/>
        <PaymentSection />
    </div>
   </div>
  )
}

export default CheckOutPage