import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    location: "" 
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirm_password || !formData.location) {
      setError("All fields are required");
      return;
    }
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/register", formData);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "white"}}>
      <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
              <div className="col-md-8 col-lg-7 col-xl-6">
                  <img src="https://img.freepik.com/premium-vector/hand-drawn-healthy-food-sketch-set_529319-265.jpg?w=740" className="img-fluid" alt="Phone image" />
              </div>
              <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1" style={{ height: "fit-content" }}>
                  {error && <p className="error">{error}</p>} 
                  <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-2">
                          <input type="text" name="name" className="form-control form-control-lg" style={inputStyle} value={formData.name} onChange={handleChange} />
                          <label className="form-label" htmlFor="form1Example13">Username</label>
                      </div>
                      <div className="form-outline mb-2">
                          <input type="email" name="email" className="form-control form-control-lg" style={inputStyle} value={formData.email} onChange={handleChange} />
                          <label className="form-label" htmlFor="form1Example13">Email address</label>
                      </div>
                      <div className="form-outline mb-2">
                          <input type="password" name="password" className="form-control form-control-lg" style={inputStyle} value={formData.password} onChange={handleChange} />
                          <label className="form-label" htmlFor="form1Example23">Password</label>
                      </div>
                      <div className="form-outline mb-2">
                          <input type="password" name="confirm_password" className="form-control form-control-lg" style={inputStyle} value={formData.confirm_password} onChange={handleChange} />
                          <label className="form-label" htmlFor="form1Example23">Confirm Password</label>
                      </div>
                      <div className="form-outline mb-2">
                          <input type="text" name="location" className="form-control form-control-lg" style={inputStyle} value={formData.location} onChange={handleChange} />
                          <label className="form-label" htmlFor="form1Example23">location</label>
                      </div>
                     
                      <div className="button-container">
                          <button type="submit" className="btn btn-primary btn-lg btn-block mt-2" style={buttonStyle} >Register</button>
                          <div className="divider d-flex align-items-center justify-content-center my-4">
                              <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                          </div>
                          <Link to="/">
                              <a className="btn btn-primary btn-lg btn-block" style={buttonStyle}  role="button">
                                  <i className="fab fa-facebook-f me-2"></i>Back to Sign In
                              </a>
                          </Link>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </section>
  );

}

// Inline styles
const inputStyle = {
  borderRadius: "5px",
  border: "1px solid #ced4da",
  padding: "6px", // Decreased padding
  width: "100%",
  boxSizing: "border-box",
  marginBottom: "6px", // Decreased margin
  outline: "none"
};

const buttonStyle = {
  backgroundColor: "#0101ff", // Blue background color
  color: "#fd0083", // Pink text color
  textAlign: "center",
  textDecoration: "none",
  display: "block",
  padding: "10px",
  borderRadius: "5px",
  width: "100%",
  boxSizing: "border-box",
  marginBottom: "10px",
  cursor: "pointer",
  fontWeight: "bold",

};

export default Register;
