











import React, { useState } from 'react'
import CartSummary from './CartSummary'
import CartItem from './CartItem'
import api from '../../api'
import { useEffect } from 'react'
import Spinner from '../ui/Spinner'
import useCartData from '../../hooks/useCartData'
//import { useCart } from '../context/CartContext'

const CartPage = ({setNumberCartItems}) => {
    

 

  const cart_code = localStorage.getItem("cart_code")
  const [cartitems, setCartItems] = useState([])
  const [cartloading, setCartLoading] = useState(false)
  const [cartTotal, setCartTotal] = useState(0.00)
  const [tax, setTax] = useState(4.00)
  

  useEffect(function() {
    api.get(`/shop/get_cart?cart_code=${cart_code}`)
    .then(res => {
      console.log(res.data)
      setCartItems(res.data.items)
      setCartTotal(res.data.sum_total)
    })
    .catch(err => {
      console.log(err.message)
    })
  }, [])


  if(cartloading) {
    return <Spinner loading={cartloading}/>
  }

   if(cartitems.length < 1){
    return (
      <div className="alert alert-primary" role="alert">
      Add items to cart!
      </div>   
    )

    
  }
    return (
    <div className="container my-4 py-4" style={{ minHeight: "80vh", overflowX: 'hidden' }}>
      <h5 className="mb-4">Shopping Cart</h5>
      <div className="row">
        {/* 🧺 Left Side — Cart Items */}
        <div className="col-md-9">
          {cartitems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              cartitems={cartitems}
              setCartTotal={setCartTotal}
              setNumberCartItems={setNumberCartItems}
              setCartItems={setCartItems}
              setCartLoading={setCartLoading}
            />
          ))}
        </div>
        {/* 💳 Right Side — Cart Summary */}
        <div className="col-md-9 d-flex justify-content-end ">
          <div className="w-100">
            <CartSummary
            cartTotal={cartTotal}
            tax={tax}
            setCartTotal={setCartTotal}
          />
        </div>
          </div>
          
      </div>
    </div>
  )

   
  


}

export default CartPage