import { Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Row, Col, Card, Image, Button, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { AiOutlineHistory } from "react-icons/ai";


import LoadingIndicator from "../LoadingIndicator";
import OrderList from "../OrderList";
import UserContact from "../UserContact";
import OrderApi from "../../api/order";
import SAlert from "react-s-alert";
import AuthApi from "../../api/auth";
import "./profile.css";

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
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-header_avt">
          <Image
            className="avt"
            style={{ width: "8rem" }}
            roundedCircle
            src={currentUser.avatarUrl || "/img/avatar_default.png"}
          ></Image>
        </div>
        <div className="profile-header_infor">
          <p>{currentUser.name}</p>
          <p>{currentUser.email + " "}</p>
          <Button size="sm" onClick={resetPassword} variant="info mb-3">
            {!rpLoading ? (
              "Đổi mật khẩu"
            ) : (
              <>
                <Spinner animation="border" variant="light" size="sm" />{" "}
                loading..
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="profile-body">
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
              <Alert variant="success">Lịch sử mua hàng <AiOutlineHistory/></Alert>
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
      </div>
    </div>
  );
};

export default Profile;
