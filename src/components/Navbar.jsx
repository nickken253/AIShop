import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginSuccess, logout } from '../redux/action/authAction';

const Navbar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    if (sessionStorage.getItem('token') != null) {
        dispatch(loginSuccess());
    }
    const state = useSelector(state => state.handleCart)

    const handleToCart = () => {
        if (sessionStorage.getItem('token') != null) {
          // Add product to cart using addCart action
          console.log('hi ae');
          navigate("/cart", { replace: true });
        } else {
          // Redirect to login page if not logged in
          console.log('ok good');
          navigate("/login", { replace: true }); // Replace the current route with login
        }
      };

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        dispatch(logout());
        navigate("/", { replace: true });
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> AI SHOP</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Members</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        {!isLoggedIn && ( // Show Login and Register if not logged in
                            <>
                                <NavLink to="/login" className="btn btn-outline-dark m-2">
                                    <i className="fa fa-sign-in-alt mr-1"></i> Login
                                </NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark m-2">
                                    <i className="fa fa-user-plus mr-1"></i> Register
                                </NavLink>
                            </>
                        )}
                        {/* Replace with appropriate content for logged-in users (e.g., profile, logout) */}
                        {isLoggedIn && (
                            <>
                                <button className="btn btn-outline-dark m-2" onClick={() => handleLogout()}>
                                    <i className="fa fa-sign-out-alt mr-1"></i> Logout
                                </button>
                            </>
                        )}
                        <button className="btn btn-outline-dark m-2" onClick={() => handleToCart()}>
                            <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;