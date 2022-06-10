import React, { useState, useEffect } from "react";
import { Row, Col, Form, Card } from "react-bootstrap";
import OrderList from "../../OrderList";
import OrderApi from "../../../api/order";
import SAlert from "react-s-alert";
import LoadingIndicator from "../../LoadingIndicator";
import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const AdminOrderList = () => {
  const [search, setSearch] = useState({
    id: "",
    username: "",
    status: "",
    size: 1,
    page: 0,
  });
  const [pageOrder, setPageOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const getListOrder = async () => {
      try {
        const response = await OrderApi.getAll(search);
        if (response.status === 200) {
          setPageOrder(response.data);
          setLoading(false);
        }
      } catch (err) {
        const errMessage =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        SAlert.error(errMessage);
        setLoading(false);
      }
    };
    const timeOut = setTimeout(() => {
      getListOrder();
    }, 400);

    return () => {
      clearTimeout(timeOut);
    };
  }, [search]);


  return (
    <>
      <Row>
      <Col xs="8">
          {loading ? (
            <LoadingIndicator size="40px" height="400px" />
          ) : (
            <OrderList isAdmin={true} pageOrderData={pageOrder} />
          )}
          {pageOrder && pageOrder.content.length > 0 && !loading && (
            <ReactPaginate
              pageCount={pageOrder.totalPages}
              pageRangeDisplayed={pageOrder.numberOfElements}
              marginPagesDisplayed={5}
              forcePage={search.page}
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
              onPageChange={({ selected }) => setSearch({ ...search, page: selected })}
            />
          )}
        </Col>
        <Col xs="4" className="mt-4">
          <Card>
            <Card.Header>
              <span className="font-weight-bold">Tìm kiếm đơn hàng</span>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label htmlFor="orderId">Mã đơn hàng</Form.Label>
                  <Form.Control
                    type="text"
                    name="orderId"
                    id="orderId"
                    value={search.id}
                    onChange={(e) => setSearch({ ...search, id: e.target.value })}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="username">Tên khách hàng</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    id="username"
                    value={search.username}
                    onChange={(e) => setSearch({ ...search, username: e.target.value })}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label form="orderStatus">Trạng thái</Form.Label>
                  <Form.Control
                    as="select"
                    name="orderStatus"
                    id="orderStatus"
                    value={search.status}
                    onChange={(e) => setSearch({ ...search, status: e.target.value })}
                  >
                    <option value="">Không chọn</option>
                    <option value="Open">Đang xử lý</option>
                    <option value="Confirmed">Đã xác nhận</option>
                    <option value="Shipping">Đang gửi hàng</option>
                    <option value="Returned">Không nhận hàng</option>
                    <option value="Collected">Đã nhận hàng</option>
                    <option value="Canceled">Đã hủy</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <Row>
            <Col xs="12" className="mt-4">
              <Form.Group>
                <Form.Label htmlFor="size"><b>Số lượng hiển thị</b></Form.Label>
                <Form.Control
                  as="select"
                  name="size"
                  id="size"
                  value={search.size}
                  onChange={(e) =>
                    setSearch({ ...search, size: +e.target.value, page: 0 })
                  }
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default AdminOrderList;
