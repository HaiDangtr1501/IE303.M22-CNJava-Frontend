import React, { useState } from "react";
import {
  Table,
  Card,
  ListGroup,
  Button,
  Row,
  Col,
  Spinner,
  Modal,
} from "react-bootstrap";
import OrderApi from "../../api/order";
import SAlert from "react-s-alert";
import YesNoQuestion from "../Dialog/YesNoQuestion";

const orderStatus = {
  Open: { status: "Đang xử lý", nextAction: "Xác nhận" },
  Confirmed: { status: "Đã xác nhận", nextAction: "Gửi hàng" },
  Shipping: { status: "Đang gửi hàng", nextAction: "Đã nhận hàng" },
  Returned: { status: "Không nhận hàng", nextAction: "Gửi lại" },
  Collected: { status: "Đã nhận hàng" },
  Canceled: { status: "Đã hủy" },
};

const OrderListItem = ({ order, isAdmin }) => {
  const [orderItem, setOrderItem] = useState({
    id: order.id,
    status: order.status,
    updatedDate: order.updatedDate,
    createdDate: order.createdDate,
    listProductItems: order.items,
    total: order.total,
    userInfo: {
      country: order.userInfo.country,
      detail: order.userInfo.detail,
      district: order.userInfo.district,
      name: order.userInfo.name,
      phone: order.userInfo.phone,
      email: order.userInfo.email,
      province: order.userInfo.province,
    },
  });

  const [updating, setUpdating] = useState(false);
  const [popupConfirmStatus, setPopupConfirmStatus] = useState(false);

  const handleCancelOrder = async () => {

    setShowDelete(false);
    setUpdating(true);
    console.log("hủy");
    try {
      const response = await OrderApi.cancelOrder(orderItem.id);
      console.log(orderItem.id);
      if (response.status === 200) {
        console.log("huy thành công");
        setOrderItem({ ...orderItem, status: "Canceled" });
        SAlert.success(response.data.message);
        setUpdating(false);
      }catch (error) {
        if (error.response.status === 400) {
          SAlert.error(error.response.data.message);
        }
    }
  };

  const handleUpdateOrder = async () => {
    setShow(false);
    setUpdating(true);
    try {
      const response = await OrderApi.updateOrder(orderItem.id);
      if (response.status === 200) {
        setOrderItem({ ...orderItem, status: response.data.orderStatus });
        SAlert.success("Cập nhật đơn hàng thành công!");
        setUpdating(false);
      }
      catch (error) {
        if (error.response.status === 400) {
          SAlert.error(error.response.data.message);
        }
    }
  };

  const handleReturnOrder = async () => {
    let text = "Người dùng xác nhập trạng thái đơn hàng trả về!"
    window.confirm(text)
    if(window.confirm(text)){
      setUpdating(true);
      try {
        const response = await OrderApi.returnOrder(orderItem.id);
        if (response.status === 200) {
          setOrderItem({ ...orderItem, status: "Returned" });
          setUpdating(false);
        }
      } catch (error) {
        if (error.response.status === 400) {
          SAlert.error(error.response.data.message);
        }
        setUpdating(false);
      }

    }
  };
  /*modal*/
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  /*modal*/
  return (
    <Card className="mb-3">
      <Card.Header>
        <strong>Mã đơn hàng:</strong> {orderItem.id}
        <br />
        <strong>Tình trạng:</strong> {orderStatus[orderItem.status].status}
        <br />
        <strong>Ngày đặt hàng: </strong>
        {orderItem.createdDate}
        <br />
        <strong>Cập nhật lần cuối: </strong> {orderItem.updatedDate}
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          {isAdmin && (
            <>
              <strong>Tên khách hàng: </strong>
              {orderItem.userInfo.name}
              <br />
              <strong>Email: </strong>
              {orderItem.userInfo.email}
              <br />
            </>
          )}
          <strong>SĐT: </strong>
          {orderItem.userInfo.phone}
          <br />
          <strong>Địa chỉ: </strong>
          {`${orderItem.userInfo.detail}, ${orderItem.userInfo.district}, ${orderItem.userInfo.province}, ${orderItem.userInfo.country}`}
          <br />
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="mb-2">
            <strong>Danh sách sản phẩm</strong>
          </div>
          <Table bordered striped variant="info" size="sm">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Giá sản phẩm</th>
                <th>Giảm giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
              </tr>
            </thead>
            <tbody>
              {orderItem.listProductItems.map((item) => (
                <tr key={item.productName}>
                  <td>{item.productName}</td>
                  <td>

                    {item.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}  
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    {(Math.round((item.price * item.quantity * (100 - item.discount)) /
                        100 /
                        10000
                      ) * 10000).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="text-right pr-4 pt-2 pb-2">
                  <strong>
                    Tổng tiền:{" "}
                    <span>
                      {orderItem.total.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                      
                    </span>
                  </strong>
                </td>
              </tr>
            </tbody>
          </Table>
          <Row>
            {isAdmin && (
              <Col>
                {!updating &&
                  !["Collected", "Canceled"].includes(orderItem.status) && (
                    <>
                      <Button
                        size="sm"
                        onClick={handleShow}
                        className="mr-md-2"
                        variant="success"
                      >
                        {orderStatus[orderItem.status].nextAction}
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>
                            Xác nhận trạng thái '
                            {orderStatus[orderItem.status].nextAction}'đơn hàng?
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Đóng
                          </Button>
                          <Button variant="primary" onClick={handleUpdateOrder}>
                            Xác nhận
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  )}
                {!updating && orderItem.status === "Shipping" && (
                  <Button
                    size="sm"
                    onClick={handleReturnOrder}
                    variant="warning"
                  >
                    Đơn hàng trả về
                  </Button>
                )}
                {/* <YesNoQuestion
                          dialogTitle="Xác nhận trạng thái đơn hàng"
                          dialogDescription={`Người dùng  xác nhận  cho đơn hàng`}
                          isOpen={popupConfirmStatus}
                          onClickNo={() => setPopupConfirmStatus(false)}
                          onClickYes={handleReturnOrder}
                        /> */}
                {updating && (
                  <>
                    <Spinner animation="border" variant="primary"></Spinner>
                    <span>Đang cập nhật</span>
                  </>
                )}
              </Col>
            )}
            <Col className="text-md-right">
              {!["Collected", "Canceled"].includes(orderItem.status) && (
                <>
                  <Button size="sm" variant="danger" onClick={handleShowDelete}>
                    Hủy đơn hàng
                  </Button>
                  <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        Xác nhận trạng thái hủy đơn hàng?
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseDelete}>
                        Đóng
                      </Button>
                      <Button variant="primary" onClick={handleCancelOrder}>
                        Xác nhận
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
            </Col>
            
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default OrderListItem;
