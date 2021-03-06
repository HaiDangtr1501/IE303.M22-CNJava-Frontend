import React, { useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { Card, Form, Button, Col, Row, Alert, Spinner, InputGroup } from "react-bootstrap";
import AuthApi from "../../api/auth";
import SAlert from "react-s-alert";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from "../../constants";

const Signup = ({ onSignup, isAuthentication }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
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
    <Row className="justify-content-center mb-lg-5">
      <Card as={Col} lg="11" md="8">
        <Card.Img src = "http://localhost:3000/img/JAVA_LAPTOP-removebg-preview(2).png" style={{ width: "250px", margin: "auto", paddingTop: "10px" }}/>
        <Card.Body>
          {/* <Alert variant="info text-center">
            <h4 className="mb-0 fw-bold">T???O T??I KHO???N</h4>
          </Alert> */}
          
          <Form onSubmit={(e) => handleSignup(e)}>
            <Form.Group>
              <Form.Label htmlFor="name" className="text-left">
                T??n ng?????i d??ng
              </Form.Label>
              <Form.Control
                id="name"
                value={name}
                onChange={(e) => onChangeName(e)}
                type="text"
                placeholder="Nh???p t??n c???a b???n"
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
                placeholder="Nh???p email c???a ba??n"
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
                M???t kh???u
              </Form.Label>   
              <InputGroup>
                <Form.Control
                  id="password"
                  required
                  value={password}
                  onChange={(e) => onChangePassword(e)}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Nh???p m???t kh???u"
                  isInvalid={error.password}
                ></Form.Control>
                <InputGroup.Text
                    style={{ cursor: "pointer" }}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? "???n" : "Hi???n"}
                </InputGroup.Text>
                {error.password && (
                  <Form.Control.Feedback type="invalid">
                    {error.password}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="confirmPassword" className="text-left">
                X??c nh???n m???t kh???u
              </Form.Label>
              <InputGroup>
                <Form.Control
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => onChangeConfirmPassword(e)}
                  type={passwordConfirmVisible ? "text" : "password"}
                  placeholder="X??c nh???n m???t kh???u"
                  isInvalid={error.confirmPassword}
                ></Form.Control>
                <InputGroup.Text
                    style={{ cursor: "pointer" }}
                    onClick={() => setPasswordConfirmVisible(!passwordConfirmVisible)}
                  >
                    {passwordConfirmVisible ? "???n" : "Hi???n"}
                </InputGroup.Text>
                {error.confirmPassword && (
                  <Form.Control.Feedback type="invalid">
                    {error.confirmPassword}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
            </Form.Group>
            <Form.Group className="text-center " style={{marginTop: "40px"}}>
            
              <Button className="col-12 mb-3" variant="dark" type="submit" >
                {loading ? (
                  <Spinner size="sm" animation="border" variant="light" />
                ) : (
                  "????ng k??"
                )}
              </Button>
            </Form.Group>
          </Form>
          <Card.Text className="text-center">
            ???? c?? t??i kho???n? <Link to="/login"> ????ng nh???p</Link>
          </Card.Text>
          <Card.Subtitle className="mb-2 mt-2">
              <h5 className="text-center">Ho????c</h5>
            </Card.Subtitle>
            <Form.Group>
              <Button className="w-100" href={GOOGLE_AUTH_URL} variant="danger">
                <FaGoogle /> ????ng nh????p b????ng Google
              </Button>
            </Form.Group>
            <Form.Group>
              <Button className="w-100" href={FACEBOOK_AUTH_URL} variant="primary">
                <FaFacebook /> ????ng nh????p b????ng Facebook
              </Button>
            </Form.Group>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Signup;
