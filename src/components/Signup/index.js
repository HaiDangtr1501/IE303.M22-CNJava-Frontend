import React, { useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { Card, Form, Button, Col, Row, Alert, Spinner } from "react-bootstrap";
import AuthApi from "../../api/auth";
import SAlert from "react-s-alert";

const Signup = ({ onSignup, isAuthentication }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const location = useLocation();
  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AuthApi.signup(name, email, password, confirmPassword);
      if (response.status === 200) {
        history.replace("/login");
        SAlert.success(response.data.message);
      }
      setLoading(false);
    } catch (err) {
      if (err.response.status === 400) {
        setError({
          name: err.response.data["name"],
          email: err.response.data["email"],
          password: err.response.data["password"],
          confirmPassword: err.response.data["confirmPassword"],
        });
      }
      setLoading(false);
    }
  };

  const onChangeName = (e) => {
    setError({ ...error, name: "" });
    setName(e.target.value);
  };

  const onChangePassword = (e) => {
    setError({ ...error, password: "" });
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setError({ ...error, confirmPassword: "" });
    setConfirmPassword(e.target.value);
  };

  const onChangeEmail = (e) => {
    setError({ ...error, email: "" });
    setEmail(e.target.value);
  };

  if (isAuthentication) {
    return <Redirect to={{ pathname: "/", state: { from: location } }} />;
  }

  return (
    <Row className="justify-content-center">
      <Card as={Col} lg="6" md="8">
        <Card.Body>
          <Alert variant="info text-center">
            <h4 className="mb-0 fw-bold">TẠO TÀI KHOẢN</h4>
          </Alert>
          <Form onSubmit={(e) => handleSignup(e)}>
            <Form.Group>
              <Form.Label htmlFor="name" className="text-left">
                Tên người dùng
              </Form.Label>
              <Form.Control
                id="name"
                value={name}
                onChange={(e) => onChangeName(e)}
                type="text"
                placeholder="Nhập tên của bạn"
                isInvalid={error.name}
              ></Form.Control>
              {error.name && (
                <Form.Control.Feedback type="invalid">{error.name}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email" className="text-left">
                Email
              </Form.Label>
              <Form.Control
                id="email"
                value={email}
                onChange={(e) => onChangeEmail(e)}
                type="email"
                placeholder="Nhập email của bản"
                isInvalid={error.email}
              ></Form.Control>
              {error.email && (
                <Form.Control.Feedback type="invalid">
                  {error.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password" className="text-left">
                Mật khẩu
              </Form.Label>
              <Form.Control
                id="password"
                value={password}
                onChange={(e) => onChangePassword(e)}
                type="password"
                placeholder="Nhập mật khẩu"
                isInvalid={error.password}
              ></Form.Control>
              {error.password && (
                <Form.Control.Feedback type="invalid">
                  {error.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="confirmPassword" className="text-left">
                Xác nhận mật khẩu
              </Form.Label>
              <Form.Control
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => onChangeConfirmPassword(e)}
                type="password"
                placeholder="Xác nhận mật khẩu"
                isInvalid={error.confirmPassword}
              ></Form.Control>
              {error.confirmPassword && (
                <Form.Control.Feedback type="invalid">
                  {error.confirmPassword}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="text-center">
              <Button className="w-50 mb-3" variant="dark" type="submit">
                {loading ? (
                  <Spinner size="sm" animation="border" variant="light" />
                ) : (
                  "Đăng ký"
                )}
              </Button>
            </Form.Group>
          </Form>
          <Card.Text className="text-center">
            Đã có tài khoản? <Link to="/login"> đăng nhập</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Signup;
