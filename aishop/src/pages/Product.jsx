import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [similarList, setSimilarList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const handleToCart = () => {
    if (sessionStorage.getItem('token') != null) {
      // Add product to cart using addCart action
      navigate("/cart", { replace: true });
    } else {
      // Redirect to login page if not logged in
      navigate("/login", { replace: true }); // Replace the current route with login
    }
  };

  const handleAddToCart = async (product) => {

    if (sessionStorage.getItem('token') != null) {
      const productId = product._id // Assuming data structure
      const userId = sessionStorage.getItem("userId");
      // const token = localStorage.getItem('token'); // Retrieve token from storage

      // Phần này đưa item vào trong giỏ hàng khi ấn thêm.
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
      navigate("/login", { replace: true }); // Replace the current route with login
    }
  };



  const getProduct = async () => {
    setLoading(true);
    setLoading2(true);
    const response = await fetch(`http://20.2.223.204:3031/api/products/productId/${id}`);
    const data = await response.json();
    setProduct(data);
    console.log(data);
    setLoading(false);
    const aiResponse = await fetch(
      `http://20.2.223.204:3033/recommendations`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        img_url: data.link,
      }),
    }
    );
    const aiData = await aiResponse.json();
    setSimilarProducts(aiData);
    setLoading2(false);
  };
  const handleSimilarList = async () => {
    similarProducts.map(async (productId) => {
      const url = 'http://20.2.223.204:3031/api/products/productId/' + productId;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setSimilarList([...similarList, data]);
      return data;
    });
    ShowSimilarProduct();
  };
  useEffect(() => {
    getProduct();
  }, [id]);
  useEffect(() => {
    handleSimilarList();
  }, [similarProducts]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product.link}
                alt="Wrong"
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.masterCategory}</h4>
              <h1 className="display-5">{product.productDisplayName}</h1>
              {/* <p className="lead">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star"></i>
              </p> */}
              <h3 className="display-6  my-4">{product.price.toLocaleString('vi-VN')} VNĐ</h3>
              {/* .toLocaleString('vi-VN') */}
              {/* <p className="lead">{product.description}</p> */}
              <button
                className="btn btn-outline-dark"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button to="/cart" className="btn btn-dark mx-3" onClick={() => handleToCart(product)}>
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarList.map((product) => {
              const item = product;
              return (
                <div key={item.id} className="card mx-4 text-center">
                  <img
                    className="card-img-top p-3"
                    src={item.link}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.productDisplayName}...
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">{product.price.toLocaleString('vi-VN')} VNĐ</li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
