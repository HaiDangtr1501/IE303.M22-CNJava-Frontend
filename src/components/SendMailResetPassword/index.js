import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { Redirect, useLocation } from "react-router-dom";
import SAlert from "react-s-alert";
import AuthApi from "../../api/auth";

const ResetPassword = ({ isAuth }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await AuthApi.sendEmailResetPassword(email);
      if (response.status === 200) {
        SAlert.success(
          `Một Email xác nhận đã được gửi đến ${email}, kiểm tra để đổi mật khẩu mới!`
        );
        setLoading(false);
      }
    } catch (err) {
      const errorMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      SAlert.error(errorMessage);
      setLoading(false);
    }
  };

  if (isAuth) {
    return <Redirect to={{ pathname: "/", state: { location: location } }} />;
  }

  return (
    <Row className="justify-content-center">
      <Col lg="5" md="6">
        <Card>
          <Card.Body>
            <Card.Title>Lấy lại mật khẩu</Card.Title>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group>
                <Form.Label>Email tài khoản khôi phục</Form.Label>
                <Form.Control
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button size="sm" type="submit">
                {!loading ? (
                  "Xác nhận"
                ) : (
                  <>
                    <Spinner animation="border" variant="light" size="sm" /> loading..
                  </>
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPassword;
