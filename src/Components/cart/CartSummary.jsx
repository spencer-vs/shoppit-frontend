import { Link } from "react-router-dom"
import api from "../../api"


const CartSummary = ({cartTotal = 0, tax = 0}) => {
  const subTotal = Number(cartTotal).toFixed(2);
  const cartTax = Number(tax).toFixed(2)
  const total = (Number(cartTotal) + Number(tax)).toFixed(2)
  
  
    return (
   <div className="col-md-4 align-self-start">
    <div className="card p-3 shadow-sm w-100" style={{ overflow: "hidden", marginLeft: '20rem'}}>
        <div className="card-body">
            <h5 className="card-title">Cart Summary</h5>
            <hr/>
            <div className="d-flex justify-content-between me-6">
                <span>Subtotal:</span>
                <span>{`$${subTotal}`}</span>
            </div>
            <div className="d-flex justify-content-between me-6">
                <span>Tax</span>
                <span>{`$${cartTax}`}</span>
            </div>
            <div className="d-flex justify-content-between mb-3 me-6">
                <span>Total</span>
                <span>{`$${total}`}</span>
            </div>
            <Link to="/checkout">
             <button className="btn btn-primary w-100"
             style={{ backgroundColor: '#6050DC', borderColor: '#6050DC'}}
             >
             Proceed to checkout
             </button>
            </Link>
        </div>
    </div>
   </div>
  )
}

export default CartSummary















// import { Link } from "react-router-dom"
// import api from "../../api"

// const CartSummary = ({cartTotal = 0, tax = 0}) => {
//   const subTotal = Number(cartTotal).toFixed(2);
//   const cartTax = Number(tax).toFixed(2)
//   const total = (Number(cartTotal) + Number(tax)).toFixed(2)
  
  
//     return (
//    <div className="col-md-4 align-self-start">
//     <div className="card p-3 shadow-sm w-100" style={{ overflow: "hidden"}}>
//         <div className="card-body">
//             <h5 className="card-title">Cart Summary</h5>
//             <hr/>
//             <div className="d-flex justify-content-between me-6">
//                 <span>Subtotal:</span>
//                 <span>{`$${subTotal}`}</span>
//             </div>
//             <div className="d-flex justify-content-between me-6">
//                 <span>Tax</span>
//                 <span>{`$${cartTax}`}</span>
//             </div>
//             <div className="d-flex justify-content-between mb-3 me-6">
//                 <span>Total</span>
//                 <span>{`$${total}`}</span>
//             </div>
//             <Link to="/checkout">
//              <button className="btn btn-primary w-100"
//              style={{ backgroundColor: '#6050DC', borderColor: '#6050DC'}}
//              >
//              Proceed to checkout
//              </button>
//             </Link>
//         </div>
//     </div>
//    </div>
//   )
// }

// export default CartSummary