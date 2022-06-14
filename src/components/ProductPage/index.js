import React, { useEffect, useState, memo, useRef } from "react";
import { Col, Row, Carousel, Card, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import CartApi from "../../api/cart";
import "./style.css";
import ProductApi from "../../api/product";
import ProductView from "../Product-View";
import LaptopDetails from "./SmartPhoneDetails";
import SmartPhoneDetails from "./LapTopDetails";
import ReviewList from "../ReviewList";
import LoadingIndicator from "../LoadingIndicator";
import { useStore, actions } from "../../store";

const ProductPage = ({ isAuth, isAdmin, enableBtnAddToCard }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsLocal, setCartItemsLocal] = useState([]);

  const { productId } = useParams();

  const [state, dispatch] = useStore();
  const { countCartItems } = state;
  const dataLocalProduct = useRef(0)

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
  useEffect(() => {
    dataLocalProduct.current = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    if (dataLocalProduct.current.length > 0) {
      setCartItemsLocal(dataLocalProduct.current);
    }
  }, [countCartItems]);
  useEffect(async () => {
    const cartItem = await CartApi.getCart();
    if (cartItem) {
      setCartItems(cartItem.data);
    }
  }, [countCartItems]);
  console.log("product page:", enableBtnAddToCard);
  return loading ? (
    <LoadingIndicator />
  ) : (
    <div className="product-page_container">
      {product && (
        <Row>
          <div className="productName">{product.name}</div>
        </Row>
      )}
      <div className="product-main">
        <Row>
          {product && (
            <>
              <Col md="4">
                <div className="product-main_product">
                  <ProductView
                    isInCart={cartItems.some(
                      (cartItem) => cartItem.productName === product.name
                    )}
                    isInCartLocal={cartItemsLocal.some(
                      (item) => item.name === product.name
                    )}
                    isAdmin={isAdmin}
                    enableBtnAddToCard={enableBtnAddToCard}
                    product={product}
                    isAuth={isAuth}
                  />
                </div>

                <div className="product-main_information">
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
                </div>
              </Col>
              <Col md="8">
                <div className="product-main_desc">
                 
                    {/* <div className="product-main_desc__title">ĐẶC ĐIỂM NỔI BẬT</div> */}
                    <Carousel className="product-main_desc__silder">
                      {product.images
                        .filter(({ type }) => type === "Slider")
                        .map(({ url }) => (
                          <Carousel.Item key={url}>
                            <img src={url} alt={url} />
                          </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className="product-main_desc__content">
                      <h5>Mô tả: </h5>
                      <p>{product.description}</p>
                    </div>
                </div>
                <div className="product-main_review">
                  <Alert variant="info">
                    <h4>Đánh giá sản phẩm</h4>
                  </Alert>
                  <div className="product-main_review_content">
                  <ReviewList
                    isAuth={isAuth}
                    closeButton={false}
                    productId={productId}
                  />
                  </div>
                </div>
              </Col>
            </>
          )}
        </Row>
      </div>
    </div>
  );
};

ProductPage.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  enableBtnAddToCard: PropTypes.bool.isRequired,
};

export default memo(ProductPage);
