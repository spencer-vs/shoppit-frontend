import styles from "./PaymentSection.module.css"
import React, {useState} from'react'
import api from "../../api";


const PaymentSection = () => {

  const cart_code = localStorage.getItem("cart_code")
  
  const [loading, setLoading] = useState(false)
  
  function makePayment(){
    console.log("Sending cart_code:", cart_code)
    const accessToken = localStorage.getItem("access")

    setLoading(true)
    api.post("/shop/initiate_payment/", {cart_code}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      setLoading(false)
      console.log(res.data);
      if(res.data.link) {
        window.location.href = res.data.link
      }
    })

    .catch(err => {
      setLoading(false)
      console.log(err.message)
    })
  }
  
  
  return (
    <div className="col-md-4">
     <div className={`card ${styles.card}`}>
      <div className="card-header" style={{ backgroundColor: '#6050DC', color: 'white'}}>
        <h5>Payment Option</h5>
      </div> 
      <div className="card-body">
        {/* Paypal Button */}
        <button className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`} id="paypal-button" >
            <i className="bi bi-paypal"></i>Pay with Paypal
        </button>

        {/* Flutterwave Button */}
        <button className={`btn btn-primary w-100 mb-3 ${styles.flutterwaveButton}`} id="flutterwave-button" onClick={makePayment}>
            <i className="bi bi-credit-card"></i>Pay with Flutterwave
        </button>
      </div>
     </div>
    </div>
  )
}

export default PaymentSection