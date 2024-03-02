import React from "react";

const Profile = async () => {
  const userId = sessionStorage.getItem("userId");

  const url = 'http://20.2.223.204:3031/api/users/get-user/' + userId;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },

  });
  const data = await response.json();
  return (
    <>
      <section class="h-100 gradient-custom-2">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-lg-9 col-xl-7">
              <div class="card">
                <div class="rounded-top text-white d-flex flex-row" style="background-color: #000; height:200px;">
                  <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
                    <img src={data.profile.avatarLink}
                      alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                      style="width: 150px; z-index: 1" />
                    <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark"
                      style="z-index: 1;" disabled>
                      Edit profile
                    </button>
                  </div>
                  <div class="ms-3" style="margin-top: 130px;">
                    <h5>{data.profile.firstname}</h5>
                    <p>{data.address.nation}</p>
                  </div>
                </div>
                <div class="card-body p-4 text-black">
                  <div class="mb-5">
                    <p class="lead fw-normal mb-1">About</p>
                    <div class="p-4" style="background-color: #f8f9fa;">
                      <p class="font-italic mb-1">{data.profile.gender}</p>
                      <p class="font-italic mb-1">{data.profile.email}</p>
                      <p class="font-italic mb-0">{data.profile.phone}</p>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <p class="lead fw-normal mb-0">Recent photos</p>
                    <p class="mb-0"><a href="#!" class="text-muted">Show all</a></p>
                  </div>
                  <div class="row g-2">
                    <div class="col mb-2">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                        alt="image 1" class="w-100 rounded-3" />
                    </div>
                    <div class="col mb-2">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                        alt="image 1" class="w-100 rounded-3" />
                    </div>
                  </div>
                  <div class="row g-2">
                    <div class="col">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                        alt="image 1" class="w-100 rounded-3" />
                    </div>
                    <div class="col">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                        alt="image 1" class="w-100 rounded-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
