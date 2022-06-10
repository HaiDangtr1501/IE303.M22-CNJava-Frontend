
import React, { useEffect, useState, memo } from "react";
import { Row, Col, Alert } from "react-bootstrap";

import { Link } from "react-router-dom";

import SAlert from "react-s-alert";
import ProductList from "../../components/Product-List";
import HeaderAdvertisement from "../../components/HeaderAdvertisement";
import HeaderImageApi from "../../api/header-image";
import { ImFire } from "react-icons/im";
import { MdOutlineSmartphone } from "react-icons/md";
import { BsChevronRight } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import "./homeStyle.css";


const Home = ({ isAdmin, isAuthentication,currentUser }) => {
  const [sliderList, setSliderList] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  console.log("check auth home", isAuthentication)
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
    <div className="home-container">
      <div className="slider-container">
        <HeaderAdvertisement sliderList={sliderList} bannerList={bannerList} />
      </div>
      <div className="product-container container">
        {/* <div className="products-icon">
          <div className="products-icon">
            <img src="../"/>
          </div>
        </div> */}
        <div className="home-product_banner__laptop">
        </div>
        <div className="home-product_container">
          <div className="home-product-title">
            <p>LAPTOP HOT <ImFire className="home-product-title_icon"/></p>
          </div>
          <div className="home-product-products">
            {<ProductList isAdmin={isAdmin} size={4} isAuth={isAuthentication} category="Laptop" />}
          </div>
          <div className="home-product_more">
            <Link to="/laptop" className="home-product_more__content">Xem thêm...</Link>
          </div>
        </div>
        <div className="home-product_banner__smartphone">
        </div>
        <div className="home-product_container">
          <div className="home-product-title green">
            <p>New SmartPhone<MdOutlineSmartphone className="home-product-title_icon"/></p>
          </div>
          <div className="home-product-products">
            {<ProductList isAdmin={isAdmin} isAuth={isAuthentication} size={4} category="SmartPhone" />}
          </div>
          <div className="home-product_more">
            <Link to="/smartphone" className="home-product_more__content">Xem thêm...</Link>
          </div>
        </div>
      </div>
      <div className="home-recommend">
          <p>Để có nhiều ưu đãi hấp dẫn!</p>
          <button className="home-recommend_btn">
          {
            !currentUser ? (<Link to="/signup" className="home-recommend_link">Đăng ký ngay</Link>) : (<Link to="/laptop" className="home-recommend_link">Khám phá ngay</Link>)
          }
          </button>
      </div>
    </div>
  );
};
export default memo(Home);
