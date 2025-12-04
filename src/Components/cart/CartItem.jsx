import React from 'react'
import api, { BASE_URL } from '../../api'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const CartItem = ({item, setCartTotal, cartitems, setNumberCartItems, setCartItems }) => {
 localStorage.getItem("cart_code");




  const [quantity, setQuantity] = useState(item.quantity)
  const [loading, setLoading] = useState(false)

 
  


  const itemID = {item_ID: item.id}

  
function deleteCartItem() {
   const confirmDelete = window.confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;
  
  const itemToDelete = cartitems.find(i => i.id === item.id);
  if (!itemToDelete) {
    console.warn("Item not found in cartItems");
    return;
  }
  // 2. Filter out the item
  const updatedItems = cartitems.filter(i => i.id !== item.id);
  // 3. Make API call
  api.delete("/shop/delete_cartitem/", {
    data: { item_id: item.id }
  })
  .then(() => {
    // 4. Update state using updatedItems and itemToDelete
   
    setCartItems(updatedItems);
    const newTotal = updatedItems.reduce((acc, curr) => acc + curr.total, 0);
    setCartTotal(newTotal);
    setNumberCartItems(prev => prev - itemToDelete.quantity);
    //toast.success("Product removed successfully")
  })
  .catch(err => {
    console.error("Delete failed:", err);
    alert("Failed to delete item");
  });
}


function updateCartItem
  ()  {
  setLoading(true);
  const itemData = { quantity, item_id: item.id };
  api.patch("/shop/update_quantity/", itemData)
    .then(res => {
      console.log(res.data)
      setLoading(false)
      //toast.success("Cart items updated successfully", {autoClose: 3000});
      const updatedItems = cartitems.map(cartitem =>
        cartitem.id === item.id ? res.data.data : cartitem
      );
       
      setCartItems(updatedItems);
      // CORRECT: Recalculate from updatedItems
      const newTotal = updatedItems.reduce((acc, curr) => acc + curr.total, 0);
      setCartTotal(newTotal);
      const newQuantity = updatedItems.reduce((acc, curr) => acc + curr.quantity, 0);
      setNumberCartItems(newQuantity); // ← DON'T use old cartItems!
      setLoading(false)
    })
    .catch(err => {
      console.log("Failed to update cart items:", err.message);
      setLoading(false)
    })
    .finally(() => setLoading(false));
}


 
  
  
  return (
   <div className="col-md-12 ">
    {/* cart Items */}
    <div className="cart-item d-flex align-items-center mb-3 p-3"
    style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}
    >
    <img 
    src={product.image && product.image.startsWith('http')
      ? product.image
      : `https://res.cloudinary.com/\( {import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1/ \){product.image}`} 
    alt="Product Image" 
    className="img-fluid"
    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
    />
    <div className="ms-3 flex-grow-1">
        <h5 className="mb-1">{item.product.name}</h5>
        <p className="mb-0 text-muted">{`$${item.product.price}`}</p>
    </div>
    <div className="d-flex align-items-center">
        <input 
        type="number" 
        min="1"
        className="form-control me-3"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{ width: '70px' }}
        />
        <button className="btn btn-danger btn-sm" 
        onClick={updateCartItem}
        style={{ backgroundColor: "#4b3bcb", color:"white", border: "none" }} disabled={loading}>
          {loading ? "Updating" : 'Update'}
        </button>
        <button className="btn mx-2 btn-sm" style={{ backgroundColor: "red", color:"white", border: "none" }} onClick={deleteCartItem}>
          Remove
        </button>
    </div>
    </div>

    {/* Add more cart items here */}
   </div>
  )
}

export default CartItem










// import React, { useState } from 'react';
// import { BASE_URL } from '../../api'; // CRITICAL
// import { toast } from 'react-toastify';
// const CartItem = ({ item, setCartTotal, cartItems, setNumberCartItems, setCartItems }) => {
//   const [quantity, setQuantity] = useState(item.quantity);
//   const [loading, setLoading] = useState(false);
//   // DELETE ITEM
//   const deleteCartItem = async () => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this item?");
//     if (!confirmDelete) return;
//     try {
//       setLoading(true);
//       await api.delete(`/shop/delete_cartitem/${item.cartitem.id}/`); // cartitem.id
//       const updatedItems = cartItems.filter(i => i.cartitem.id !== item.cartitem.id);
//       setCartItems(updatedItems);
//       const newTotal = updatedItems.reduce((acc, curr) => acc + curr.total, 0);
//       setCartTotal(newTotal);
//       setNumberCartItems(prev => prev - 1);
//       toast.success("Product removed successfully");
//     } catch (err) {
//       console.error("Delete failed:", err);
//       toast.error("Failed to delete item");
//     } finally {
//       setLoading(false);
//     }
//   };
//   // UPDATE QUANTITY
//   const updateCartItem = async () => {
//     if (quantity < 1) {
//       setQuantity(1);
//       return;
//     }
//     try {
//       setLoading(true);
//       const itemData = { quantity, item_id: item.product.id };
//       const res = await api.patch(`/shop/update_quantity/${item.cartitem.id}/`, itemData);
//       const updatedItems = cartItems.map(i =>
//         i.cartitem.id === item.cartitem.id
//           ? { ...i, quantity: res.data.data.quantity, total: res.data.data.total }
//           : i
//       );
//       setCartItems(updatedItems);
//       const newTotal = updatedItems.reduce((acc, curr) => acc + curr.total, 0);
//       setCartTotal(newTotal);
//       toast.success("Cart item updated successfully");
//     } catch (err) {
//       console.error("Failed to update cart item:", err.message);
//       toast.error("Failed to update item");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="col-md-12">
//       <div className="cart-item d-flex align-items-center mb-3 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
//         {/* IMAGE */}
//         <img
//           src={`${BASE_URL}${item.product.image}`}
//           alt={item.product.name}
//           className="img-fluid"
//           style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
//         />
//         {/* DETAILS */}
//         <div className="ms-3 flex-grow-1">
//           <h5 className="mb-1">{item.product.name}</h5>
//           <p className="mb-0 text-muted">${item.product.price}</p>
//         </div>
//         {/* QUANTITY */}
//         <div className="d-flex align-items-center">
//           <input
//             type="number"
//             min="1"
//             className="form-control me-3"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             style={{ width: '70px' }}
//           />
//           <button
//             className="btn btn-danger btn-sm"
//             onClick={updateCartItem}
//             disabled={loading}
//             style={{ backgroundColor: '#d43b3b', color: 'white', border: 'none' }}
//           >
//             {loading ? 'Updating...' : 'Update'}
//           </button>
//         </div>
//         {/* TOTAL & DELETE */}
//         <div className="ms-3 text-end">
//           <p className="mb-1 fw-bold">${item.total}</p>
//           <button
//             className="btn mx-2 btn-sm"
//             onClick={deleteCartItem}
//             disabled={loading}
//             style={{ backgroundColor: 'red', color: 'white', border: 'none' }}
//           >
//             Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CartItem;