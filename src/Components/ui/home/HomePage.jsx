import Header from "./Header"
import CardContainer from "./CardContainer"
import { useEffect, useState } from 'react'
import api from "../../../api"
import PlaceHolderContainer from "../PlaceHolderContainer"
import Error from "../Error"
import { randomValue } from "../../../GenerateCardCode"




const HomePage = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  
  
  useEffect(function(){
  let cart_code = localStorage.getItem("cart_code");

  if (!cart_code) {
    cart_code = randomValue();
    localStorage.setItem("cart_code", cart_code)
    console.log("New cart_code generated:", cart_code);
  } else {
    console.log("Existing cart_code:", cart_code)
  }
  }, [])



 
  




  useEffect(function() {
     setLoading(true)
    api.get("/shop/products/").then(res => {
      console.log(res.data)
      setProducts(res.data)
      setLoading(false)
      setError("")
    })
    
    .catch(err => {
      setLoading(false)
      setError("Failed to fetch products:", err.message)
      
    })

  }, [])


  return (
    <div>
      <Header />
      {error && <Error error={error} />}
      {loading && <PlaceHolderContainer />}
      {loading || error !="" || <CardContainer products={products} />}
  
     
   
    </div>
  )
}

export default HomePage



//  if(localStorage.getItem("cart_code")) {
//       localStorage.setItem("cart_code", randomValue());
//     }