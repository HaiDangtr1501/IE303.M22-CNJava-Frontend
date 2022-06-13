import React, { useEffect, useState, useRef } from "react";
import { Alert, Row, Col, Button } from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import CartApi from "../../api/cart";
import CartItem from "../CartItem";
import "./style.css";

const CartPage = (props) => {
  const [listItem, setListItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hasUpdated, setHasUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const dataLocalProduct = useRef(0)
  const totalPriceLocal = useRef(0)
  
  const [hasUpdatedLocal, setHasUpdateLocal] = useState(false);
  
  
  useEffect(() => {
    const getCart = async () => {
      const response = await CartApi.getCart();
      if (response.data.length > 0) {
        const cartTotal = response.data
          .filter(({ enable }) => enable)
          .map(({ productPrice, productDiscount, quantity }) => {
            return (
              Math.round((productPrice * (100 - productDiscount)) / 100 / 10000) *
              quantity *
              10000
            );
          })
          .reduce((total, current) => total + current, 0);
        setTotalPrice(cartTotal);
      }
      setListItem(response.data);
    };
    getCart();
    setHasUpdated(false);
       
  }, [hasUpdated]);

  useEffect(()=>{
    if(!props.isAuthentication){
      if (!localStorage.getItem("products")) {
        localStorage.setItem("products", "[]");
      }
      dataLocalProduct.current = JSON.parse(localStorage.getItem("products"))
      let total = 0
      for(let i = 0; i < dataLocalProduct.current.length; i++) {
        if(dataLocalProduct.current[i].enable === true){
          total = total +  (Math.round(
            (dataLocalProduct.current[i].price * dataLocalProduct.current[i].quantity * (100 - dataLocalProduct.current[i].discount)) /
              100 /
              10000
          ) * 10000)
  
        }
      }
      totalPriceLocal.current = total
      setHasUpdateLocal(false);
    }
    
    
  },[hasUpdatedLocal])
  
  const updatedCart = () => {
    setHasUpdated(true);
  };
  const updatedCartLocal = () => {
    setHasUpdateLocal(true)
  }
  return (props.isAuthentication ? (
    (listItem.length > 0) ? (
      <div className="cart-container">
        <Row className="justify-content-center">
        <Col lg="8">
          <Alert variant="warning">
            <h4 className="text-center mb-0">GIỎ HÀNG</h4>
          </Alert>
          {listItem.map((item) => (
              <CartItem isAuth={props.isAuthentication} key={item.cartId} onChange={() => updatedCart()} data={item} />
          ))}

          <div>
            <strong className="cart-total-price">
              Tổng tiền:{" "}
              {totalPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
              })} {" "}
              
            </strong>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4 mb-5">
        <Col md="4" className="text-center">
          <Button className="w-100" as={Link} to="/checkout">
            Tiến Hành Thanh Toán
          </Button>
        </Col>
      </Row>
      </div>
    ) : (
      <>
        <Row className="justify-content-center">
          <Col md="5" className="text-center">
            <Button as={Link} to="/home" variant="light" className="w-100 pt-2 pb-2">
              <h4 className="mb-0">Chưa có sản phẩm trong giỏ hàng</h4>
              <br />
              <FaCartPlus size="50%" />
            </Button>
          </Col>
        </Row>
      </>
        
    )
  ) : (
    (dataLocalProduct.current.length > 0) ? (
      <>
        <Row className="justify-content-center">
        <Col lg="8">
          <Alert variant="warning">
            <h4 className="text-center mb-0">GIỎ HÀNG</h4>
          </Alert>
          {dataLocalProduct.current.map((item) => (
              <CartItem isAuth={props.isAuthentication} key={item.cartId}   data={item} onChange={() => updatedCartLocal()}/>
          ))}

          <div>
            <strong className="cart-total-price">
              Tổng tiền:{" "}
              {totalPriceLocal.current.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
              })} {" "}
              
            </strong>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4 mb-5">
        <Col md="4" className="text-center">
          <Button className="w-100" as={Link} to="/checkout">
            Tiến Hành Thanh Toán
          </Button>
        </Col>
      </Row>
      </>
    ) : (
      <Row className="justify-content-center">
        <Col md="5" className="text-center">
          <Button as={Link} to="/home" variant="light" className="w-100 pt-2 pb-2">
            <h4 className="mb-0">Chưa có sản phẩm trong giỏ hàng</h4>
            <br />
            <FaCartPlus size="50%" />
          </Button>
        </Col>
      </Row>
    )
  ))
};

export default CartPage;
