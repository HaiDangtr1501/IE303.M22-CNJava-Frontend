import React, { useEffect, useState } from "react";
import UserApi from "../../../api/user";
import SAlert from "react-s-alert";
import { Table, Row, Col, Alert, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import YesNoQuestion from "../../Dialog/YesNoQuestion";

const ListUserPage = () => {
  const [page, setPage] = useState(0);
  const [pageUser, setPageUser] = useState(null);
  const [popupAddRoleAdmin, setPopupAddRoleAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getAllUser = async () => {
      try {
        const response = await UserApi.findAll({ page: page });
        setPageUser(response.data);
        setLoading(false);
      } catch (err) {
        const errMessage =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        SAlert.error(errMessage);
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      getAllUser();
    }, 200);

    return () => clearTimeout(timeout);
  }, [page]);

  const handleAddAdminRole = async (userId) => {
    try {
      const response = await UserApi.addRoleAdmin(userId);
      const listUser = [...pageUser.content];
      const index = listUser.findIndex((user) => userId === user.id);
      listUser[index].authorities.push("ROLE_ADMIN");

      setPageUser({ ...pageUser, content: listUser });

      if (response.status === 200) {
        SAlert.success(response.data.message);
      }
    } catch (err) {
      const errMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      SAlert.error(errMessage);
    }
  };

  return (
    <>
      <Alert variant="info" className="mb-4">
        <h2 className="mb-0 text-center">Danh sách tài khoản người dùng</h2>
      </Alert>
      {pageUser && pageUser.content.length > 0 && !loading && (
        <>
          <Table bordered striped size="sm">
            <thead className="text-center">
              <tr>
                <th>ID</th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ liên hệ</th>
                <th>Quyền</th>
                <th>Thêm quyền admin</th>
              </tr>
            </thead>
            <tbody>
              {pageUser.content.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {user.detail !== "" &&
                      user.district !== "" &&
                      user.province !== "" &&
                      user.country !== "" &&
                      `${user.detail}, ${user.district}, ${user.province}, ${user.country}`}
                  </td>
                  <td>{user.authorities.toString()}</td>
                  <td className="text-center">
                    {!user.authorities.includes("ROLE_ADMIN") ? (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => setPopupAddRoleAdmin(!popupAddRoleAdmin)}
                        >
                          Thêm
                        </Button>
                        <YesNoQuestion
                          dialogTitle="Xác nhận thêm quyền Admin"
                          dialogDescription={`Người dùng ${user.name} sẽ có quyền Admin`}
                          isOpen={popupAddRoleAdmin}
                          onClickNo={() => setPopupAddRoleAdmin(false)}
                          onClickYes={() => handleAddAdminRole(user.id)}
                        />
                      </>
                    ) : (
                      "Is Admin"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row className="justify-content-center mt-2 product-list-pagination">
            <Col md="5">
              <ReactPaginate
                pageCount={pageUser.totalPages}
                pageRangeDisplayed={pageUser.numberOfElements}
                marginPagesDisplayed={5}
                forcePage={page}
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
                onPageChange={({ selected }) => setPage(selected)}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ListUserPage;
