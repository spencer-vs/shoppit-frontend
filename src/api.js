





import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { AuthProvider } from "./Components/context/AuthContext";

// export const BASE_URL = 'http://127.0.0.1:8001'; 

export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8001";


const api = axios.create({
  baseURL: BASE_URL
});
// ✅ Helper function to check if token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (err) {
    return true; // invalid token format
  }
};
// ✅ Function to refresh access token
const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;
  try {
    const res = await axios.post("http://127.0.0.1:8001/shop/token/refresh/", {
      refresh,
    });
    localStorage.setItem("access", res.data.access);
    return res.data.access;
  } catch (err) {
    console.warn("Token refresh failed:", err.message);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    return null;
  }
};
// ✅ Axios request interceptor
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("access");
  const publicEndpoints = [
    "/shop/products/",
    "/shop/get_cart",
    "/shop/create_cart/",
  ];
  const isPublic = publicEndpoints.some((url) => config.url.includes(url));
  if (token && !isPublic) {
    // Decode & refresh if needed
    if (isTokenExpired(token)) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        config.headers.Authorization = `Bearer ${newToken}`;
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    delete config.headers.Authorization;
  }
  return config;
});




//signup api call
export async function registerUser(formData) {
  const response = await fetch("http://localhost:8001/shop/signup/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return await response.json();
}




export default api;