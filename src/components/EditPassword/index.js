import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SAlert from "react-s-alert";
import AuthApi from "../../api/auth";

const ResetPassword = ({ isAuth, onPasswordChange }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await AuthApi.postNewPassword(token, password, passwordConfirm);
      if (response.status === 200) {
        SAlert.success("Mật khẩu đã được thay đổi thành công");
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
    onPasswordChange();
  }

  return (
    <Row className="justify-content-center">
      <Col lg="4" md="6">
        <Card>
          <Card.Body>
            <Card.Title>Đổi mật khẩu mới</Card.Title>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group>
                <Form.Label>Mật khẩu mới</Form.Label>
                <Form.Control
                  name="password"
                  size="sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                <Form.Control
                  name="passwordConfirm"
                  size="sm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  type="password"
                />
              </Form.Group>
              <Button size="sm" type="submit">
                {!loading ? (
                  "Đổi mật khẩu"
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
