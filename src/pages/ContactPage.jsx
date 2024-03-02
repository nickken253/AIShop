import React from "react";
import { Footer, Navbar } from "../components";
const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3 text-center">
        <h1 className="text-center">MEMBERS</h1>
        <hr />
        <br />
        <br />
        <br />
        <br />
        <div class="container">

          <div class="row">
            <div class="col-md-6">
              <div class="card">

                <div class="card-body">
                  <h5 class="card-title">Đinh Hoàng Anh</h5>
                  <p class="card-text">Leader</p>
                  <a href="#">Liên hệ</a>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">

                <div class="card-body">
                  <h5 class="card-title">Trần Hữu Ngọc</h5>
                  <p class="card-text">Developer</p>
                  <a href="#">Liên hệ</a>
                </div>
              </div>
            </div>
            <br></br>

            <div class="col-md-6">
              <div class="card">

                <div class="card-body">
                  <h5 class="card-title">Đặng Việt Khôi</h5>
                  <p class="card-text">Developer</p>
                  <a href="#">Liên hệ</a>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">

                <div class="card-body">
                  <h5 class="card-title">Nguyễn Mạnh Hiếu</h5>
                  <p class="card-text">Developer</p>
                  <a href="#">Liên hệ</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <hr />
      <Footer />
    </>
  );
};

export default ContactPage;
