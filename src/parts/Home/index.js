import React, { useEffect, useState } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import SAlert from "react-s-alert";
import ProductList from "../../components/Product-List";
import HeaderAdvertisement from "../../components/HeaderAdvertisement";
import HeaderImageApi from "../../api/header-image";

const Home = ({ isAdmin }) => {
  const [sliderList, setSliderList] = useState([]);
  const [bannerList, setBannerList] = useState([]);

  useEffect(() => {
    const getHeaderImage = async () => {
      try {
        const [sliderResponse, bannerResponse] = await Promise.all([
          HeaderImageApi.getWithFilter({ enable: true, type: "Slider" }),
          HeaderImageApi.getWithFilter({ enable: true, type: "Banner" }),
        ]);
        if (sliderResponse.status === 200) {
          setSliderList(sliderResponse.data);
        }
        if (bannerResponse.status === 200) {
          setBannerList(bannerResponse.data);
        }
      } catch (err) {
        const errMessage =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        SAlert.error(errMessage);
      }
    };

    getHeaderImage();
  }, []);
  return (
    <div className="container mb-3">
      <HeaderAdvertisement sliderList={sliderList} bannerList={bannerList} />
      <br />
      <Row>
        <Col>
          <Alert variant="primary">
            <h4>LAPTOP MỚI</h4>
          </Alert>
        </Col>
      </Row>
      {<ProductList isAdmin={isAdmin} size={4} category="Laptop" />}

      <Row className="mt-4">
        <Col>
          <Alert variant="primary">
            <h4>ĐIỆN THOẠI MỚI</h4>
          </Alert>
        </Col>
      </Row>
      {<ProductList isAdmin={isAdmin} size={4} category="SmartPhone" />}
    </div>
  );
};
export default Home;
