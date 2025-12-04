import { BASE_URL } from "../../api"

const OrderItem = ({cartitem}) => {
  return (
   <div className="d-flex justify-content-between align-items-center mb-3" style={{padding: '5px 10px'}}>
    <div className="d-flex align-items-center">
      <img 
      src={product.image && product.image.startsWith('http')
      ? product.image
      : `https://res.cloudinary.com/\( {import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1/ \){product.image}`} 
      alt="Product Data" 
      className="img-fluid" 
      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px'}}
      />
      <div className="ms-3">
        <h6 className="mb-0">{cartitem.product.name}</h6>
        <small>{`Quantity: ${cartitem.quantity}`}</small>
      </div>
    </div>
    <h6>{`$${cartitem.product.price}`}</h6>
   </div>
  )
}

export default OrderItem