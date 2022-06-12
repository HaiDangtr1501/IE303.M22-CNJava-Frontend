import React, { useEffect, useState, memo } from "react";
import { Col, Row, Carousel, Card, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { useParams } from "react-router";

import "./style.css";
import ProductApi from "../../api/product";
import ProductView from "../Product-View";
import LaptopDetails from "./SmartPhoneDetails";
import SmartPhoneDetails from "./LapTopDetails";
import ReviewList from "../ReviewList";
import LoadingIndicator from "../LoadingIndicator";

const ProductPage = ({ isAuth, isAdmin, enableBtnAddToCard }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const { productId } = useParams();

  useEffect(() => {
    setLoading(true);
    const getProduct = async () => {
      try {
        const response = await ProductApi.getById(productId);
        const productData = response.data;
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error) {
          console.log(error);
        }
      }
    };
    const timeOut = setTimeout(() => {
      getProduct();
    }, 400);

    return () => {
      clearTimeout(timeOut);
    };
  }, [productId]);
  console.log("product page:", enableBtnAddToCard)
  return loading ? (
    <LoadingIndicator />
  ) : (
    <>
      <Row className="product-page">
        {product && (
          <>
            <Col md="4">
              <Card>
                <Card.Header>HÌNH ẢNH SẢN PHẨM</Card.Header>
                <ProductView
                  isAdmin={isAdmin}
                  enableBtnAddToCard={enableBtnAddToCard}
                  product={product}
                  isAuth={isAuth}
                />
              </Card>
            </Col>
            <Col md="8">
              <Card>
                <Card.Header>ĐẶC ĐIỂM NỔI BẬT</Card.Header>
                <Carousel>
                  {product.images
                    .filter(({ type }) => type === "Slider")
                    .map(({ url }) => (
                      <Carousel.Item key={url}>
                        <img src={url} alt={url} />
                      </Carousel.Item>
                    ))}
                </Carousel>
                <Card.Body>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>
      <Row className="mt-5">
        {product && (
          <Col md="4">
            <Card>
              <Card.Header className="text-center badge-info">
                Cấu hình sản phẩm
              </Card.Header>
              {product.categoryName === "Laptop" && (
                <LaptopDetails details={product.details} />
              )}
              {product.categoryName === "SmartPhone" && (
                <SmartPhoneDetails details={product.details} />
              )}
            </Card>
          </Col>
        )}
        <Col md="8">
          <Alert variant="info">
            <h4>Đánh giá sản phẩm</h4>
          </Alert>
          <ReviewList isAuth={isAuth} closeButton={false} productId={productId} />
        </Col>
      </Row>
    </>
  );
};

ProductPage.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  enableBtnAddToCard: PropTypes.bool.isRequired,
};

export default memo(ProductPage);
