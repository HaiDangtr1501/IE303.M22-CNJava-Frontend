import React, { useEffect, useState } from "react";
import { Row, Form, Col } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import SAlert from "react-s-alert";
import NumberFormat from "react-number-format";
import CartApi from "../../api/cart";

const CartItem = ({ data, onChange }) => {
  const [enable, setEnable] = useState(data.enable);
  const [quantity, setQuantity] = useState(data.quantity);
  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    const updateCartItem = async () => {
      try {
        const response = await CartApi.updateItem(data.cartId, quantity, enable);
        if (response.status === 200) {
          onChange();
        }
        setHasUpdate(false);
      } catch (error) {
        SAlert.error(error.response.data.message);
        setHasUpdate(false);
      }
    };

    const timer = setTimeout(() => {
      if (hasUpdate) {
        updateCartItem();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [enable, quantity, hasUpdate, onChange, data]);

  const onChangeQuantity = (e) => {
    setQuantity(e.target.value);
    setHasUpdate(true);
  };

  const onChangeEnable = () => {
    setEnable(!enable);
    setHasUpdate(true);
  };

  const onDelete = async () => {
    try {
      const response = await CartApi.deleteItem(data.cartId);
      if (response.status === 200) {
        SAlert.success(response.data.message);
        onChange();
      }
    } catch (error) {
      SAlert.error(error.response.data.message);
    }
    setHasUpdate(true);
  };

  return (
    <Row className="mt-3 mb-3 pt-2 pb-2 border" style={{ borderColor: "#333" }}>
      <Col md="3">
        <img className="img-thumbnail" src={data.productImageUrl} alt="" />
      </Col>
      <Col md="8">
        <div style={{ minHeight: "60px" }}>
          <strong style={{ fontSize: "18px", color: "#f44336" }}>
            {data.productName}
          </strong>
        </div>
        <Form.Group>
          <Form.Label>
            <strong>Số lượng</strong>
          </Form.Label>
          <Form.Control
            style={{ width: "100px" }}
            value={quantity}
            min={1}
            type="number"
            onChange={onChangeQuantity}
          ></Form.Control>
        </Form.Group>
        <div className="mb-3">
          <strong>Thành tiền: </strong>
          <NumberFormat
            value={
              Math.round(
                (data.productPrice * quantity * (100 - data.productDiscount)) /
                  100 /
                  10000
              ) * 10000
            }
            thousandSeparator={true}
            suffix="đ"
            displayType="text"
          />{" "}
          {data.productDiscount > 0 && (
            <NumberFormat
              className="old-price"
              value={data.quantity * data.productPrice}
              thousandSeparator={true}
              suffix="đ"
              displayType="text"
            />
          )}
        </div>
        <Form.Switch
          id={`switch-${data.cartId}`}
          label="Chọn mua"
          checked={enable}
          onChange={onChangeEnable}
        />
      </Col>
      <Col md="1">
        <MdDelete
          role="button"
          fontSize="30px"
          onClick={onDelete}
          onMouseOver={({ target }) => (target.style.color = "red")}
          onMouseOut={({ target }) => (target.style.color = "black")}
        />
      </Col>
    </Row>
  );
};

export default CartItem;
