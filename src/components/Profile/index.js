import { Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Row, Col, Card, Image, Button, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

import LoadingIndicator from "../LoadingIndicator";
import OrderList from "../OrderList";
import UserContact from "../UserContact";
import OrderApi from "../../api/order";
import SAlert from "react-s-alert";
import AuthApi from "../../api/auth";

const Profile = ({ updateCurrentUser, currentUser }) => {
  const [pageOrder, setPageOrder] = useState(null);
  const [rpLoading, setRPLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [currentPageOrder, setCurrentPageOrder] = useState(0);

  useEffect(() => {
    setOrderLoading(true);

    const getListOrder = async () => {
      try {
        const response = await OrderApi.getAllByUser({
          page: currentPageOrder,
        });
        console.log(response);
        setPageOrder(response.data);
        setOrderLoading(false);
      } catch (err) {
        const errorMessage =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        SAlert.error(errorMessage);
        setOrderLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      getListOrder();
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentPageOrder]);

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      setRPLoading(true);
      const response = await AuthApi.sendEmailResetPassword(currentUser.email);
      if (response.status === 200) {
        SAlert.success(
          `Một Email xác nhận đã được gửi đến ${currentUser.email}, kiểm tra để đổi mật khẩu mới!`
        );
        setRPLoading(false);
      }
    } catch (err) {
      const errorMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      SAlert.error(errorMessage);
      setRPLoading(false);
    }
  };

  return (
    <Card>
      <Image
        style={{ width: "8rem" }}
        roundedCircle
        src={currentUser.avatarUrl || "/img/avatar_default.png"}
      ></Image>

      <Card.Body>
        <Card.Title>{currentUser.name}</Card.Title>
        <Card.Text>{currentUser.email + " "}</Card.Text>
        <Button size="sm" onClick={resetPassword} variant="info mb-3">
          {!rpLoading ? (
            "Đổi mật khẩu"
          ) : (
            <>
              <Spinner animation="border" variant="light" size="sm" /> loading..
            </>
          )}
        </Button>

        <Row>
          <Col md="4">
            <Alert variant="info">Thông tin liên hệ</Alert>
            <UserContact
              phone={currentUser.phone}
              country={currentUser.country}
              province={currentUser.province}
              district={currentUser.district}
              detail={currentUser.detail}
              onUpdated={updateCurrentUser}
            />
          </Col>
          <Col md="8">
            <Alert variant="success">Lịch sử mua hàng</Alert>
            {orderLoading ? (
              <LoadingIndicator size="40px" height="400px" />
            ) : (
              <OrderList isAdmin={false} pageOrderData={pageOrder} />
            )}
            {pageOrder && pageOrder.content.length > 0 && !orderLoading && (
              <ReactPaginate
                pageCount={pageOrder.totalPages}
                pageRangeDisplayed={pageOrder.numberOfElements}
                marginPagesDisplayed={5}
                forcePage={currentPageOrder}
                nextLabel={<FaAngleRight />}
                previousLabel={<FaAngleLeft />}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
                disabledClassName={"disabled"}
                onPageChange={({ selected }) => setCurrentPageOrder(selected)}
              />
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Profile;
