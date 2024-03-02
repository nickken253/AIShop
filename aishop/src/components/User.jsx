import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

const Profile = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const state = useSelector(state => state.handleCart)
  const userId = sessionStorage.getItem("userId");

  console.log(userId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://20.2.223.204:3031/api/users/get-user/${userId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                    <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                      Edit profile
                    </MDBBtn>
                  </div>
                  <div className="ms-3" style={{ marginTop: '130px' }}>
                    <MDBTypography tag="h5">{data.profile.firstname} {data.profile.lastname}</MDBTypography>
                    <MDBCardText>{data.address.nation}</MDBCardText>
                  </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1">

                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">({state.length})</MDBCardText>
                      <MDBCardText className="small text-muted mb-0"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})</MDBCardText>
                    </div>

                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{data.profile.email}</MDBCardText>
                      <MDBCardText className="font-italic mb-1">{data.profile.phone}</MDBCardText>
                      <MDBCardText className="font-italic mb-0">{data.profile.gender}</MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
};

export default Profile;
