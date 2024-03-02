import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Register = () => {
    const [lname, setlName] = useState("");
    const [fname, setfName] = useState("");
    const [email, setEmail] = useState("");
    const [nation, setNation] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Get navigation function


    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        if (!password || password.trim() === '') {
            setErrorMessage('Password is required');
            return; // Prevent further processing if password is empty
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return; // Prevent further processing if passwords don't match
        }


        // After successful submission, clear error message and passwords
        setErrorMessage('');
        setPassword('');
        setConfirmPassword('');

        setIsLoading(true);
        setError(null); // Clear any previous errors


        try {
            const response = await fetch("http://20.2.223.204:3031/api/auth/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    profile: {
                        firstname: fname,
                        lastname: lname,
                        email: email,
                        gender: gender,
                        phone: phone,

                    },
                    password: password,
                    address:
                    {
                        nation: nation,
                    }
                }),
            });
            if (!response.ok) {
                throw new Error("Registration failed");
            }

            const data = await response.json(); // Parse response data
            console.log(data);

            if (data) {
                // Registration successful, show success message and redirect to Home
                const userId = data._id // Assuming data structure
                // const token = localStorage.getItem('token'); // Retrieve token from storage
                console.log(userId);
                const response = await fetch("http://20.2.223.204:3031/api/cart/create-cart", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        totalQuantity: 0,
                        totalPrice: 0,

                    }),
                });
                navigate("/login");
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false); // Always disable loading state
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form my-3">
                                <label htmlFor="Name">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="FName"
                                    placeholder="Enter Your First Name"
                                    value={fname}
                                    onChange={(e) => setfName(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Name">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="LName"
                                    placeholder="Enter Your Last Name"
                                    value={lname}
                                    onChange={(e) => setlName(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Name">Nation</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Nation"
                                    placeholder="Nation"
                                    value={nation}
                                    onChange={(e) => setNation(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Name">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Phone"
                                    placeholder="Phone Numbers"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="form-group my-3">
  <label htmlFor="gender">Gender</label>
  <div className="d-flex flex-row">
    <div className="mr-3">
      <input
        type="radio"
        id="male"
        name="gender"
        value="male"
        checked={gender === "male"} // Set checked based on gender state
        onChange={(e) => setGender(e.target.value)}
      />
      <label htmlFor="male">Male</label>
    </div>
    <div className="mr-3">
      <input
        type="radio"
        id="female"
        name="gender"
        value="female"
        checked={gender === "female"} // Set checked based on gender state
        onChange={(e) => setGender(e.target.value)}
      />
      <label htmlFor="female">Female</label>
    </div>
    <div>
      <input
        type="radio"
        id="other"
        name="gender"
        value="other"
        checked={gender === "other"} // Set checked based on gender state
        onChange={(e) => setGender(e.target.value)}
      />
      <label htmlFor="other">Other</label>
    </div>
  </div>
</div>
                            <div className="form my-3">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Password">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="ConfirmPassword"
                                    placeholder="Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />

                            </div>
                            <div className="my-3 text-center">
                                <p>
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-decoration-underline text-info">
                                        Login
                                    </Link>
                                </p>
                            </div>
                            <div className="text-center">
                                <button
                                    className="my-2 mx-auto btn btn-dark"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Registering..." : "Register"}
                                </button>
                            </div>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
            <hr />
            <Footer />
        </>
    );
};

export default Register;
