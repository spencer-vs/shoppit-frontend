import { useState, useEffect } from "react"
import api from "../api"

function useCartData() {
   const cart_code = localStorage.getItem("cart_code")
   const [cartitems, setCartItems] = useState([])
   const [cartTotal, setCartTotal] = useState(0.00)
   const [cartloading, setCartLoading] = useState(false)
   const tax = 4.00
   
   useEffect(function() {
    setCartLoading(true)
   api.get(`/shop/get_cart?cart_code=${cart_code}`)
   .then(res => {
    console.log(res.data)
    setCartLoading(false)
    setCartItems(res.data.items)
    setCartTotal(res.data.sum_total)
   
   })

   .catch(err => {
    console.log(err.message)
    setCartLoading("Failed to load data:", false)
   })

  }, [cart_code])

  return {cartitems, setCartItems, cartTotal, setCartTotal, cartloading, tax}

}

export default useCartData