import React from "react";
import { Col, Row } from "react-bootstrap";
import OrderListItem from "../OrderListItem";
import PropTypes from "prop-types";

const OrderList = ({ isAdmin, pageOrderData }) => {
  return pageOrderData && pageOrderData.content.length > 0 ? (
    <>
      <div className="mb-2 text-center">
        <strong>Tìm thấy {pageOrderData.totalElements} kết quả</strong>
      </div>
      {pageOrderData.content.map((order) => (
        <Row key={order.id}>
          <Col>
            <OrderListItem isAdmin={isAdmin} order={order} />
          </Col>
        </Row>
      ))}
    </>
  ) : (
    <div className="text-center">
      <strong>CHƯA CÓ ĐƠN HÀNG NÀO ĐƯỢC ĐẶT</strong>
    </div>
  );
};

OrderList.defaultProps = {
  isAdmin: false,
};

OrderList.propTypes = {
  isAdmin: PropTypes.bool,
};

export default OrderList;
