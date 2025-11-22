import React, { useEffect, useState } from "react";
import api from "../../api";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'



const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    state: "",
    address: "",
    phone: "",
  });
  // Load current user data on page load
  useEffect(() => {
    api
      .get("/shop/user_info")
      .then((res) => {
        setForm({
          username: res.data.username || "",
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          email: res.data.email || "",
          city: res.data.city || "",
          state: res.data.state || "",
          address: res.data.address || "",
          phone: res.data.phone || "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  // Form change handler
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // Submit update
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    api
      .put("/shop/update_profile/", form)
      .then((res) => {
        console.log(res.data)
        alert("Profile updated successfully!");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
        alert("Failed to update profile");
      })
      .finally(() => setSaving(false));
  };
  if (loading) return <Spinner />;
  return (
    <div className="container my-5">
      <h3>Edit Profile</h3>
      <hr />
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="row">
          {/* Username */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          {/* Email */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          {/* First name */}
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="first_name"
              className="form-control"
              value={form.first_name}
              
              onChange={handleChange}
            />
          </div>
          {/* Last name */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              value={form.last_name}
              onChange={handleChange}
            />
          </div>
          {/* City */}
          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={form.city}
              onChange={handleChange}
            />
          </div>
          {/* State */}
          <div className="col-md-6 mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              value={form.state}
              onChange={handleChange}
            />
          </div>
          {/* Address */}
          <div className="col-md-12 mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              className="form-control"
              rows="2"
              value={form.address}
              onChange={handleChange}
            ></textarea>
          </div>
          {/* Phone */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};
export default EditProfile;