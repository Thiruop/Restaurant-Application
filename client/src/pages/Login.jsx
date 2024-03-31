// Login.jsx

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PiFacebookLogoFill } from "react-icons/pi";
import { BsTwitter } from "react-icons/bs";
import { RiLinkedinFill } from "react-icons/ri";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
     
        try {
            const response = await axios.post("http://localhost:3000/api/login", formData);
            const token = response.data.token; 
            localStorage.setItem('token', token); 
            localStorage.setItem('userEmail', formData.email); 
            navigate("/home")
           
        } catch (error) {
            console.error("An error occurred:", error);
            setError("Invalid email, password, or role");
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
                        {error && <p className="error text-center">{error}</p>} 
                        <form onSubmit={handleSubmit}>
                            <div className="form-outline mb-2">
                                <input type="email" name="email" className="form-control form-control-lg" style={inputStyle} value={formData.email} onChange={handleChange} placeholder="Email" required />
                            </div>
                            <div className="form-outline mb-2">
                                <input type="password" name="password" className="form-control form-control-lg" style={inputStyle} value={formData.password} onChange={handleChange} placeholder="Password" required />
                            </div>
                            <div className="form-outline mb-2">
                                <input type="text" name="role" className="form-control form-control-lg" style={inputStyle} value={formData.role} onChange={handleChange} placeholder="Role" required />
                            </div>
                           
                            <div className="button-container" style={{ marginTop: "20px" }}> 
                                <button type="submit" className="btn btn-primary btn-lg btn-block mt-2" style={button_Style}>Login</button>
                            </div>
                        </form>
                        <div className="divider d-flex align-items-center justify-content-center my-4">
                            <p className="text-center fw-bold mx-3 mb-0 text-muted">Don't have an account? <Link to="/register">Sign up</Link></p>
                        </div>
                        <div className="divider d-flex align-items-center justify-content-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0 text-muted"> If you are Employee<Link to="login">SignIn here</Link></p>
                        </div>
                        <div className=" align-items-center justify-content-center justify-content-lg-start">
                            <div className="divider d-flex align-items-center justify-content-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">Sign Up With</p>
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start pl-1">
                                <button type="button" className="btn btn-primary btn-floating mx-1 pl-4" style={buttonStyle}>
                                    <PiFacebookLogoFill />
                                </button>
                                <button type="button" className="btn btn-primary btn-floating mx-1 pl-1" style={buttonStyle}>
                                    <BsTwitter />
                                </button>
                                <button type="button" className="btn btn-primary btn-floating mx-1 pl-1" style={buttonStyle}>
                                    <RiLinkedinFill />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const inputStyle = {
    borderRadius: "5px",
    border: "1px solid #ced4da",
    padding: "6px",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "6px",
    outline: "none"
};

const buttonStyle = {
    backgroundColor: "#0101ff", 
    color: "#fd0083",
    textAlign: "center",
    textDecoration: "none",
    display: "block",
    padding: "10px",
    borderRadius: "5px",
    width: "30%",
    boxSizing: "border-box",
    marginBottom: "10px",
    cursor: "pointer",
    fontWeight: "bold",  
};

const button_Style = {
  backgroundColor: "#0101ff", 
  color: "#fd0083", 
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

export default Login;
