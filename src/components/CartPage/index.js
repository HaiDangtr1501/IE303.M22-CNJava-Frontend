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
  const dataLocalProduct = useRef()

  useEffect(() => {
    if(!props.isAuthentication){
      let i = 0;
      if (!localStorage.getItem("products")) {
        localStorage.setItem("products", "[]");
      }
      dataLocalProduct.current = JSON.parse(localStorage.getItem("products"))
      
    }else{

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
  
      setHasUpdated(false);
      getCart();
    }
    setHasUpdated(false);
  }, [hasUpdated]);
 
  const updatedCart = () => {
    setHasUpdated(true);
  };
  
  return (listItem.length > 0 )? (
    <>
      <Row className="justify-content-center">
        <Col lg="8">
          <Alert variant="warning">
            <h4 className="text-center mb-0">GIỎ HÀNG</h4>
          </Alert>
          {/* {!props.isAuthentication? (
            listItem.map((item) => (
              <CartItem key={item.cartId} onChange={() => updatedCart()} data={item} />
            ))
          ):(
            dataType.map((dt) => {
              {console.log(dt)}
              <CartItem key={dt.key} onChange={() => updatedCart()} dt={dt} />
          }) 
          )} */}
          {props.isAuthentication == true && listItem.map((item) => (
              <CartItem key={item.cartId} onChange={() => updatedCart()} data={item} />
          ))}

          {props.isAuthentication == false && dataLocalProduct.current.map((item) => (
              <CartItem key={item.id} onChange={() => updatedCart()} data={item} />
          ))}

            
          
          <div>
            <strong className="cart-total-price">
              Tổng tiền:{" "}
              <NumberFormat
                value={totalPrice}
                thousandSeparator={true}
                suffix="đ"
                displayType="text"
              />
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
  );
};

export default CartPage;
