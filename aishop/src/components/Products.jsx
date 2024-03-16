import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/action";
import { useNavigate } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("");
  let componentMounted = true;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleAddToCart = async (product) => {
    if (sessionStorage.getItem('token') != null) {
      const productId = product._id // Assuming data structure
      const userId = sessionStorage.getItem("userId");
      
      const url = 'http://20.2.223.204:3031/api/cart/add-cart-item/' + userId;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({
          productId: productId,
          quantity: 1,
          totalPrice: product.price,
          price: product.price,
        }),
      });
      dispatch(addCart(product));
    } else {
      // Redirect to login page if not logged in
      navigate("/login", { replace: true }); // Replace the current route with login
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://20.2.223.204:3031/api/products/get-product-by-page");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const sortProducts = (option) => {
    setSortOption(option); // Update sort state
    const sortedData = [...filter].sort((a, b) => {
      if (option === "low-to-high") {
        return a.price - b.price; // Sort by price in ascending order
      } else if (option === "high-to-low") {
        return b.price - a.price; // Sort by price in descending order
      } else {
        return 0; // No sorting (default behavior)
      }
    });
    setFilter(sortedData); // Update filtered data with sorted results
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.gender === cat);
    setFilter(updatedList);
  }

  const filterProduct1 = (cat) => {
    const updatedList = data.filter((item) => item.masterCategory === cat);
    setFilter(updatedList);
  }

  const filterProduct2 = (cat) => {
    const updatedList = data.filter((item) => item.baseColour === cat);
    setFilter(updatedList);
  }

  const ShowProducts = () => {
    return (
      <>
      <div className="row">    
        <div className="col-md-2">
          <div className="buttons text-center py-5">
            <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>Clear Fitler</button>
            <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Men")}>Men's Clothing</button>
            <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Unisex")}>Unisex's Clothing</button>
            <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Women")}>
              Women's Clothing
            </button>
            <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct1("Accessories")}>Accessories</button>
            <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct2("Red")}>Red</button>
            <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct2("Black")}>Black</button>
            <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct2("Blue")}>Blue</button>
            <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct2("White")}>White</button>
            <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct2("Grey")}>Grey</button>
          </div>
        </div>  

        <div className="col-md-10 col-sm-12 col-xs-12 col-12 mb-4">

          <select name="Price" id="price" placeholder="Price" onChange={(e) => sortProducts(e.target.value)}>
            <option value="">Price</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>

          <div className="row">
          {filter.map((product) => {
            return (
              <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                <div className="card text-center h-100" key={product.id}>
                <Link to={"/product/" + product.id}>
                  <img
                    className="card-img-top p-3 img-responsive"
                    src={product.link}
                    alt="Card"
                    style={{ objectFit: "cover" }}
                  />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.productDisplayName}...
                    </h5>
                    <p className="card-text">
                      {product.description}...
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">{product.price.toLocaleString('vi-VN')} VNĐ</li>
                  </ul>
                  <div className="card-body">
                    <Link to={"/product/" + product.id} className="btn btn-dark m-1">
                      Buy Now
                    </Link>
                    <button className="btn btn-dark m-1" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

            );
          })}
          </div>
        </div>
      </div>
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
