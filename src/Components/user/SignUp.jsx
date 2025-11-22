import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api";
const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    const result = await registerUser(form);
    // Backend errors
    if (result.username || result.email || result.password) {
      setErrors(result);
      return;
    }
    // Success
    setSuccess("Account created successfully. Redirecting to login...");
   
    setTimeout(() => {
      navigate("/login");   // redirect
    }, 1500);
  };
  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="text-center mb-4">Create Your Account</h3>
      {success && <div className="alert alert-success">{success}</div>}
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger">
          <ul className="mb-0">
            {Object.keys(errors).map((key) => (
              <li key={key}>{errors[key]}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-white">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="col mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              onChange={handleChange}
            />
          </div>
          <div className="col mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <div className="col mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              onChange={handleChange}
            />
          </div>
          <div className="col mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Shipping Address</label>
          <textarea
            className="form-control"
            name="address"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Create Account
        </button>
      </form>
    </div>
  );
};
export default Signup;
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// <Routes>
//   <Route path="/signup" element={<Signup />} />
//   <Route path="/login" element={<Login />} />
// </Routes>