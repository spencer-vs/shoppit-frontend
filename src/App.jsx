import { BrowserRouter, Routes, Route } from "react-router-dom"; // Add this if not already in index.js
import NavBar from "./Components/ui/NavBar";
import Footer from "./Components/ui/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./Components/ui/home/Header"
import MainLayout from "./layout/MainLayout";
import HomePage from "./Components/ui/home/HomePage"
import NotFoundPage from "./Components/NotFoundPage";
import ProductPage from "./Components/product/ProductPage";
import { useState, useEffect } from "react";
import api from "./api";
import CartPage from "./Components/cart/CartPage";
import CheckOutPage from "./Components/checkout/CheckOutPage";
import LoginPage from "./Components/user/LoginPage";
import ProtectedRoute from "./Components/ui/ProtectedRoute";
import { AuthProvider } from "./Components/context/AuthContext";
import UserProfilePage from "./Components/user/UserProfilePage";
import PaymentStatusPage from "./Components/payments/PaymentStatusPage";
import Signup from "./Components/user/SignUp";
import EditProfile from "./Components/user/EditProfile";
import About from "./Components/ui/home/About"
import Contact from "./Components/ui/home/Contact"
import { randomValue } from "./GenerateCardCode";


const App = () => {
  const [numCartItems, setNumberCartItems] = useState(0)
  const [inCart, setInCart] = useState(false)



  
  
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

return (
  <Routes>
    <Route path="/" element={<MainLayout numCartItems={numCartItems} />}>
    <Route index element={<HomePage />}/>
    <Route path="products/:slug" element={ <ProductPage setNumberCartItems={setNumberCartItems}  
    inCart={inCart} setInCart={setInCart} />  } />
    <Route path="cart" element={<CartPage  setNumberCartItems={setNumberCartItems} />} />
    <Route path="/checkout" element={
      <ProtectedRoute>
      <CheckOutPage />
      </ProtectedRoute>}
   />
    <Route path="*" element={<NotFoundPage /> } />
    <Route path='/login' element={<LoginPage />} />
    <Route path="/profile" element={<UserProfilePage />} />
    <Route path="/payment-status/" element={<PaymentStatusPage  setNumberCartItems={setNumberCartItems}  
    setInCart={setInCart} />} />
    </Route>
    <Route path="/register" element={<Signup />} />
    <Route path="/update_profile" element={<EditProfile />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
);
};

export default App;






