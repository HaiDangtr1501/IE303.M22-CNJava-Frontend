import React, { useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { Card, Button, Form, Row, Col, Spinner, InputGroup } from "react-bootstrap";
import { FaGoogle, FaFacebook } from "react-icons/fa";

import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from "../../constants";
import SAlert from "react-s-alert";
import AuthApi from "../../api/auth";
import ButtonSendEmailVerify from "../ButtonSendEmailVerify";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState({ field: "", message: "" });
  const [sendingEmailConfirm, setSendingEmailConfirm] = useState(false);
  const [emailSended, setEmailSended] = useState(false);

  const location = useLocation();

  if (props.location.state) {
    if (props.location.state.error) {
      SAlert.error(props.location.state.error);
    }
  }

  if (props.isAuthentication) {
    return (
      <Redirect
        to={{
          pathname: "/home",
          state: {
            from: location.pathname,
          },
        }}
      />
    );
  }

  const onChangePassword = (e) => {
    setError({ field: "", message: "" });
    setPassword(e.target.value);
  };

  const onChangeEmail = (e) => {
    setError({ field: "", message: "" });
    setEmail(e.target.value);
  };

  const sendEmailConfirm = async () => {
    setSendingEmailConfirm(true);
    try {
      const response = await AuthApi.sendEmailVerification(email);
      if (response.status === 200) {
        setSendingEmailConfirm(false);
        setEmailSended(true);
      }
    } catch (err) {
      const errorMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      SAlert.error(errorMessage);
      setSendingEmailConfirm(false);
    }
  };

  const handleOnSubmit = async (e) => {
    const { type, message } = await props.onLocalLogin(e, {
      email: email,
      password: password,
    });
    if (type === "success") {
      SAlert.success(message);
    } else {
      switch (message) {
        case "Not found email":
          setError({
            message: "Email chưa đăng ký",
            field: "email",
          });
          break;
        case "Bad credentials":
          setError({
            message: "Sai mật khẩu",
            field: "password",
          });
          break;
        case "User is disabled":
          setError({
            message: "Email chưa được xác nhận",
            field: "email",
          });
          break;
        default:
          break;
      }
    }
  };

  return (
    <Row className="justify-content-center">
      <Card as={Col} md="6">
        <Card.Body>
          <Card.Title className="mb-4">
            <h3 className="text-center">Login to JAVA</h3>
          </Card.Title>
          <Form onSubmit={(e) => handleOnSubmit(e)}>
            <Form.Group>
              <Form.Label htmlFor="email" className="text-left">
                Email
              </Form.Label>
              <Form.Control
                id="email"
                value={email}
                onChange={(e) => onChangeEmail(e)}
                type="email"
                placeholder="Nhập email tài khoản"
                isInvalid={error.field === "email"}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {error.message}{" "}
              </Form.Control.Feedback>
              {error.message === "Email chưa được xác nhận" && (
                <ButtonSendEmailVerify
                  isSended={emailSended}
                  isSending={sendingEmailConfirm}
                  onClick={sendEmailConfirm}
                />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password" className="text-left">
                Mật khẩu
              </Form.Label>
              <InputGroup>
                <Form.Control
                  id="password"
                  onChange={(e) => onChangePassword(e)}
                  value={password}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Nhập mật khẩu tài khoản"
                  isInvalid={error.field === "password"}
                ></Form.Control>
                <InputGroup.Text
                  style={{ cursor: "pointer" }}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? "Ẩn" : "Hiện"}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {error.message}
                </Form.Control.Feedback>
              </InputGroup>

              <Link to="/reset-password">
                <small>Quên mật khẩu</small>
              </Link>
            </Form.Group>
            <Form.Group className="text-center mb-1">
              <Button className="w-50" variant="dark" type="submit">
                {!props.loading ? (
                  "Login"
                ) : (
                  <Spinner animation="border" variant="light" size="sm" />
                )}
              </Button>
            </Form.Group>
            <div className="text-center">
              <Link className="text-decoration-none" to="/signup">
                Tạo tài khoản mới
              </Link>
            </div>
            <Card.Subtitle className="mb-2 mt-2">
              <h5 className="text-center">Or</h5>
            </Card.Subtitle>
            <Form.Group>
              <Button className="w-100" href={GOOGLE_AUTH_URL} variant="danger">
                <FaGoogle /> Login with Google
              </Button>
            </Form.Group>
            <Form.Group>
              <Button className="w-100" href={FACEBOOK_AUTH_URL} variant="primary">
                <FaFacebook /> Login with Facebook
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Login;
