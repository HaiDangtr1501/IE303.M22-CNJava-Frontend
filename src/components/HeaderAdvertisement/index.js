import React from "react";
import { Carousel, Row, Col, Image } from "react-bootstrap";

const HeaderAdvertisement = ({ sliderList, bannerList }) => {
  return (
    <Row>
      <Col xs="8">
        {sliderList.length > 0 && (
          <Carousel>
            {sliderList.map((slide) => {
              return (
                <Carousel.Item interval={500000} key={slide.id}>
                  <a href={slide.linkTo}>
                    <img
                      className="d-block w-100 objectf"
                      style={{ height: 340 }}
                      src={slide.url}
                      alt={slide.title}
                    />
                  </a>
                  <Carousel.Caption className="bg-light p-2">
                    <h3 className="text-dark mb-0">{slide.title}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        )}
      </Col>
      <Col xs="4">
        <Row noGutters>
          {bannerList.map((banner) => {
            return (
              <Col xs="6" className="p-1" key={banner.id}>
                <a href={banner.linkTo}>
                  <Image src={banner.url} alt={banner.title} className="d-block w-100" />
                </a>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

HeaderAdvertisement.defaultProps = {
  sliderList: [],
  bannerList: [],
};

export default HeaderAdvertisement;
