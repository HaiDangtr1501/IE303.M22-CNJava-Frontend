import React, { useState, useEffect } from "react";
import { Row, Col, Form, Spinner, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SAlert from "react-s-alert";
import AuthApi from "../../api/auth";
import { Link } from "react-router-dom";
import ButtonSendEmailVerify from "../ButtonSendEmailVerify";

const SendEmailVerification = ({ isAuth }) => {
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });
  const [sendingEmailConfirm, setSendingEmailConfirm] = useState(false);
  const [emailSended, setEmailSended] = useState(false);
  const [email, setEmail] = useState("");
  const { token } = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      console.log("chay vao day");
      (async () => {
        try {
          const response = await AuthApi.verifyEmail(token);
          if (response.status === 200) {
            setMessage({ type: "success", text: "Xác nhận Email thành công" });
            setLoading(false);
          }
        } catch (err) {
          setMessage({ type: "danger", text: err.response.data.message });
          setEmail(err.response.data.email);
          setLoading(false);
        }
      })();
    }, 400);
  }, [token]);

  const sendEmailVerify = async () => {
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
      SAlert(errorMessage);
      setSendingEmailConfirm(false);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col lg="6" md="8">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Card>
            <Card.Header className={`text-center text-light bg-${message.type}`}>
              <h4 className="mb-0">
                {message.type === "success"
                  ? "Xác nhận Email tài khoản thành công"
                  : "Xác nhận Email tài khoản thất bại"}
              </h4>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                {message.type === "danger" ? "Error: " : ""}
                {message.text}
              </Card.Title>
              {message.type === "danger" && message.text === "Phiên làm việc đã hết hạn" && (
                <Form>
                  <Form.Group>
                    <Form.Label htmlFor="email">Gửi lại email xác nhận</Form.Label>
                    <br />
                    <ButtonSendEmailVerify
                      isSended={emailSended}
                      isSending={sendingEmailConfirm}
                      onClick={sendEmailVerify}
                    />
                  </Form.Group>
                </Form>
              )}
              {message.type === "success" && (
                <Button as={Link} to="/login">
                  Đăng nhập
                </Button>
              )}
            </Card.Body>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default SendEmailVerification;
