import React, { useEffect, useState } from "react";
import { Alert, Row, Col, Button } from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import CartApi from "../../api/cart";
import CartItem from "../CartItem";
import "./style.css";

const CartPage = () => {
  const [listItem, setListItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hasUpdated, setHasUpdated] = useState(false);

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

    setHasUpdated(false);
    getCart();
  }, [hasUpdated]);

  const updatedCart = () => {
    setHasUpdated(true);
  };

  return listItem.length > 0 ? (
    <>
      <Row className="justify-content-center">
        <Col lg="8">
          <Alert variant="warning">
            <h4 className="text-center mb-0">GIỎ HÀNG</h4>
          </Alert>
          {listItem.map((item) => (
            <CartItem key={item.cartId} onChange={() => updatedCart()} data={item} />
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
