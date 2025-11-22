import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api";

const PaymentStatusPage = ({ setNumberCartItems, setInCart}) => {
  const [statusMessage, setStatusMessage] = useState('Verifying your payment');
  const [statusSubMessage, setStatusSubMessage] = useState('Wait a moment, your payment is been verified')
  const location = useLocation();

  // useEffect(function(){
    

  //   const queryParams = new URLSearchParams(location.search);
  //   const status = queryParams.get('status')
  //   const txRef = queryParams.get('tx_ref')
  //   const transactionId = queryParams.get('transaction_id');
  //   const tx_ref = queryParams.get('tx_ref')



//     useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const status = queryParams.get('status');
//     const flutterwaveTxRef = queryParams.get('tx_ref');  // from redirect
//     const pendingTxRef = localStorage.getItem('pending_tx_ref');  // from initiate
//     // USE THE ONE YOU CREATED
//     const txRefToUse = pendingTxRef || flutterwaveTxRef;
//     if (status && txRefToUse) {
//         api.get(`/shop/payment_callback/?status=${status}&tx_ref=${txRefToUse}`)
//             .then(res => {
//                 setStatusMessage(res.data.message);
//                 setStatusSubMessage(res.data.subMessage);
//                 localStorage.removeItem('cart_code');
//                 localStorage.removeItem('pending_tx_ref');  // cleanup
//                 setNumberCartItems(0);
//             })
//             .catch(err => console.error(err));
//     }
// }, [location.search]);


useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    const tx_ref = params.get("tx_ref");
    const transaction_id = params.get("transaction_id");
    if (status && tx_ref && transaction_id) {
        api.get(`/shop/payment_callback/?status=${status}&tx_ref=${tx_ref}&transaction_id=${transaction_id}`)
            .then(res => {
                setStatusMessage(res.data.message);
                setStatusSubMessage(res.data.subMessage);
                localStorage.removeItem("pending_tx_ref");
                localStorage.removeItem("cart_code");
                setInCart(false)
            })
            .catch(err => console.error(err));
    }
}, [location.search]);





  return (
    <header className="py-3" style={{ backgroundColor: "#6050DC" }}>
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          <h2 className="display-4 fw-bold">{statusMessage}</h2>
          <p className="lead fw-normal text-white-75 mb-4">
           {statusSubMessage}
          </p>
          <span>
            <Link to="/profile" className="btn btn-light btn-lg px-4 py-2 mx-3">View Order Details</Link>
             <Link to="/" className="btn btn-light btn-lg px-4 py-2 mx-3">Continue Shopping</Link>
          </span>
        </div>
      </div>
    </header>
  )
}

export default PaymentStatusPage