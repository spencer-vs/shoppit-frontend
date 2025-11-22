import { useParams } from "react-router-dom"
import ProductPagePlaceHolder from "./ProductPagePlaceHolder"
import RelatedProducts from "./RelatedProducts"
import { useEffect, useState } from "react"
import api from "../../api"
import { BASE_URL } from "../../api"

import { toast } from "react-toastify"





const ProductPage = ({setNumberCartItems, inCart, setInCart}) => {
   const { slug } = useParams();
   const [product, setProduct] = useState({})
   const [similarProducts, setSimilarProducts] = useState([])
   const [loading, setLoading] = useState(false)
   const [cartStatus, setCartStatus] = useState({})
   
   const cart_code = localStorage.getItem("cart_code");
  


   

 
   

  useEffect(function() {
    if(!product.id) return;
    const cart_code = localStorage.getItem("cart_code");
    
    api.get(`/shop/product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
    .then (res => {
      console.log(res.data)
      setInCart(res.data.product_in_cart)
    })
    .catch (err => {
      console.log(err.message)
    })
  }, [cart_code, product.id])
  

function add_item() {
  const cart_code = localStorage.getItem("cart_code"); // CORRECT
  const newItem = {
    cart_code: cart_code,
    product_id: product.id
  };
  
  api.post("/shop/add_item/", newItem)
    .then(res => {
      console.log("Added:", res.data);
      // Update localStorage only if backend created a new cart_code
      if (res.data.cart_code) {
        localStorage.setItem("cart_code", res.data.cart_code);
      }
      setInCart(true);
      setNumberCartItems(curr => curr + 1);
     // toast.success("Product added succesfully")
    })
    .catch(err => {
      console.log("Add item failed:", err.message);
    });
}





  
  
  useEffect(() => {
    setLoading(true)
    console.log("Fetching product with slug:", slug); // Debug
    api
      .get(`/shop/product_detail/${slug}/`)   // <- add leading slash
      .then((res) => {
        console.log("Product data:", res.data);
        setProduct(res.data)
        setSimilarProducts(res.data.similar_products || [])
        setLoading(false)
      })
      .catch((err) => {
        console.log("Error:", err.response?.data || err.message);
        setLoading(false)
      });
  }, [slug]);




 



  if(loading){
    return <ProductPagePlaceHolder />
  }

  return (
     <div>
  
    <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
                <div className="col-md-6">
                    <img src={`${BASE_URL}${product.image}`} alt="" className="card-img-top mb-5 mb-md-0"/>
                </div>
                <div className="col-md-6">
                    <div className="small mb-1">SKU: BST-498</div>
                    <h1 className="display-5 fw-bolder">{product.name}</h1>
                    <div className="fs-5 mb-5">
                        
                        <span>{`$${product.price}`}</span>
                    </div>
                    <p className="lead">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam qui, eaque deserunt neque minima, unde quaerat asperiores cumque ducimus obcaecati nihil doloribus excepturi illum eligendi labore voluptatem, atque at. Autem?
                    </p>
                    <div className="d-flex">
                       <button 
                       className="btn btn-outline-dark flex-shrink-0" 
                       type='button'
                        onClick={() => add_item(product)}
                       disabled={inCart}
                       >
                        <i className="bi-cart-fill me-1"></i>
                        {inCart ? 'Product added to cart' : "Add to cart"}
                       </button>
                    </div>
                </div>
             </div> 
        </div>

          
    </section>
    <RelatedProducts products={similarProducts}/>
  </div>



  );
};
export default ProductPage;


// if(!cart_code || product.id) {
//       setLoadingCartCheck(false);
//       return; }
      
//       setLoadingCartCheck(true)
//       api.get(`/shop/product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
//     .then(res =>{
//       console.log(res.data)
//       setInCart(res.data.product_in_cart)
//     })

//     .catch(err => {
//       console.log("Not in cart or error:", err)
//       setInCart(false)
//     })
//     .finally(() => {
//       setLoadingCartCheck(false)
//     })
    
    



//  if (!cart_code) {
//       alert("Cart not initialized. Please refresh or visit homepage.");
//       return;
//     }

//     const newItem = {cart_code, product_id: product.id};
    
    
//     api.post("/shop/add_item/", newItem)
//     .then(res => {
//       console.log("Added:", res.data)
//       setInCart(true);
//       toast.success("Item Added Successfully")
//       setNumberCartItems(curr => curr + 1);
//     })

//     .catch(err => {
//       console.log("Add item failed:", err.message)
//     })