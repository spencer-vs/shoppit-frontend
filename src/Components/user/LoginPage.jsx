import "./LoginPage.css"
import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
//import { AuthContext } from "../context/AuthContext"
import error from "./../ui/Error"
import api from "../../api"
import { SiTrueup } from "react-icons/si"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'

// ...existing code...
const LoginPage = () => {


  const {setIsAuthenticated, get_username} = useContext(AuthContext)

  const location = useLocation()
  const navigate = useNavigate()
  
  const [username, setUsername ] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  const userInfo = {username, password}


  function handleSubmit(e) {
  console.log("Rendered")
  e.preventDefault();
  setLoading(true);
  setError("");
  api
    .post("/shop/token/", { username, password })
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      //localStorage.removeItem("cart_code")
      setUsername("");
      setPassword("");
      setLoading(false);
      setIsAuthenticated(true)
      get_username()
     // toast.success("Login successfull")
      const from = location.state?.from?.pathname || "/";
     //console.log("Navigate to:", from);
      navigate(from, { replace: true });
    })
    .catch((err) => {
      console.error("Login error:", err);
      setLoading(false);
      setError("Wrong credentials");
    });
}

  // function handleSubmit(e){
  //   e.preventDefault()
  //   setLoading(true)
  //   api.post("/shop/token/", userInfo)
  //   .then(res => {
  //     console.log(res.data)
  //     localStorage.setItem("access", res.data.access)
  //     localStorage.setItem("refresh", res.data.refresh)
  //     setUsername("")
  //     setPassword("")
  //     setLoading(false)
  //     setError("")

  //     const from = location.state?.from?.pathname || "/";
  //     navigate(from, {replace:true})
  //   })

  //   .catch(err => {
  //     console.log(err.message)
  //     setLoading(false)
  //     setError(err.message)
  //   })

  // }



  return (
    <div className="login-container my-5">
      <div className="login-card shadow">
        {error && <p className="error">{error}</p>}
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please login to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="username" value={username} className="form-control" id="email" placeholder="Enter Your Username"
            onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
           <label htmlFor="password" className="form-label">Password</label>
            <input type="password" value={password} className="form-control" id="password" placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
           Login
          </button>
        </form>

        <div className="mt-3 text-center">
         Don't have an account <Link to="/register"  tyle={{ backgroundColor: '#6050DC', color: 'white' }}>Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
// ...existing code...