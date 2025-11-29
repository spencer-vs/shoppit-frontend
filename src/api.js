





// import axios from "axios";
// import { jwtDecode } from 'jwt-decode';
// import { AuthProvider } from "./Components/context/AuthContext";

// // export const BASE_URL = 'http://127.0.0.1:8001'; 

// export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8001";


// const api = axios.create({
//   baseURL: BASE_URL
// });
// // ✅ Helper function to check if token is expired
// const isTokenExpired = (token) => {
//   try {
//     const decoded = jwtDecode(token);
//     const now = Date.now() / 1000;
//     return decoded.exp < now;
//   } catch (err) {
//     return true; // invalid token format
//   }
// };
// // ✅ Function to refresh access token
// const refreshAccessToken = async () => {
//   const refresh = localStorage.getItem("refresh");
//   if (!refresh) return null;
//   try {
//     const res = await axios.post("http://127.0.0.1:8001/shop/token/refresh/", {
//       refresh,
//     });
//     localStorage.setItem("access", res.data.access);
//     return res.data.access;
//   } catch (err) {
//     console.warn("Token refresh failed:", err.message);
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     return null;
//   }
// };
// // ✅ Axios request interceptor
// api.interceptors.request.use(async (config) => {
//   const token = localStorage.getItem("access");
//   const publicEndpoints = [
//     "/shop/products/",
//     "/shop/get_cart",
//     "/shop/create_cart/",
//   ];
//   const isPublic = publicEndpoints.some((url) => config.url.includes(url));
//   if (token && !isPublic) {
//     // Decode & refresh if needed
//     if (isTokenExpired(token)) {
//       const newToken = await refreshAccessToken();
//       if (newToken) {
//         config.headers.Authorization = `Bearer ${newToken}`;
//       }
//     } else {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   } else {
//     delete config.hfeaders.Authorization;
//   }
//   return config;
// });




// //signup api call
// export async function registerUser(formData) {
//   const response = await fetch("http://localhost:8001/shop/signup/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formData),
//   });
//   return await response.json();
// }




// export default api;



// api.js or axiosInstance.js
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
// This is correct — keep it!
export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8001";
const api = axios.create({
  baseURL: BASE_URL, // All normal api.get(), api.post() will use correct URL
});
// Helper functions
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};
// FIXED: Use BASE_URL instead of hardcoded localhost
const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;
  try {
    const res = await axios.post(`${BASE_URL}/shop/token/refresh/`, { refresh });
    localStorage.setItem("access", res.data.access);
    return res.data.access;
  } catch (err) {
    console.warn("Token refresh failed:", err.message);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    return null;
  }
};
// Interceptor stays the same
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("access");
  const publicEndpoints = ["/shop/products/", "/shop/get_cart", "/shop/create_cart/"];
  const isPublic = publicEndpoints.some((endpoint) => config.url.includes(endpoint));
  if (token && !isPublic) {
    if (isTokenExpired(token)) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        config.headers.Authorization = `Bearer ${newToken}`;
      } else {
        delete config.headers.Authorization;
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    delete config.headers.Authorization;
  }
  return config;
});
// FIXED: Use BASE_URL here too!
export async function registerUser(formData) {
  const response = await fetch(`${BASE_URL}/shop/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  // Handle Django might return 400 with error details — don't always assume .json() works
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }
  // If not JSON (e.g. HTML error page), throw text for debugging
  throw new Error(await response.text());
}
export default api;