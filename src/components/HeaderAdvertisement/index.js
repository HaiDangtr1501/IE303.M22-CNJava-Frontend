import React from "react";
import { Carousel, Row, Col, Image } from "react-bootstrap";
import "./advertisement.css";
const HeaderAdvertisement = ({ sliderList, bannerList }) => {
  return (
    <div className="Advertisement">
      <Row>
      <Col xs="7">
        {sliderList.length > 0 && (
          <Carousel className="slider-adv-container">
            {sliderList.map((slide) => {
              return (
                <Carousel.Item interval={2000} key={slide.id} className="slider-item">
                  <a href={slide.linkTo}>
                    <img
                      className="d-block w-100 objectf"
                      style={{ height: 340 }}
                      src={slide.url}
                      alt={slide.title}
                    />
                  </a>
                  <Carousel.Caption className="p-2 slider-item-title">
                    <h3 className=" mb-0">{slide.title}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        )}
      </Col>
      <Col xs="5" className="banner-adv-container">
          {bannerList.map((banner) => {
            return (
              <Col  className="banner-adv-item" key={banner.id}>
                <a href={banner.linkTo}>
                  <Image src={banner.url} alt={banner.title} className="banner-adv-item_img" />
                </a>
              </Col>
            );
          })}
      </Col>
    </Row>
    </div>
  );
};

HeaderAdvertisement.defaultProps = {
  sliderList: [],
  bannerList: [],
};

export default HeaderAdvertisement;
