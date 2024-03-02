import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Login = () => {
  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      navigate('/');
    }
  },);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get navigation function

  const handleFetch = async (item) =>  {
    try
    {
      const url = 'http://20.2.223.204:3031/api/cart/get-cart-items/' + item.user._id;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
          
        });
        const data = await response.json();
        console.log(data);
    }
    catch(err){
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://20.2.223.204:3031/api/auth/login", { // Replace with your API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) { // Check for HTTP errors
        throw new Error("Login failed");
      }

      const data = await response.json(); // Parse response data
      console.log(data);

      if (data) {
        // Login successful, navigate to Home
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("userId", data.user._id);
        handleFetch(data);
        navigate("/");
      } else {
        setError(data.message || "Login failed"); // Handle specific errors
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="display-4">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
              <div className="my-3 text-center">
                <p>
                  New Here?{" "}
                  <Link to="/register" className="text-decoration-underline text-info">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </>
  );
};

export default Login;
