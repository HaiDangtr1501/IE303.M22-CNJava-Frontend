import { Card, Form, Button, Col, Row, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import "./LayoutLoginSignup.css";
import Login from "../../components/Login"
import Signup from "../../components/Signup"

const LayoutLoginSignup = (props) => {
    const [clickChange, setClickChange] = useState(true);
    let className = "active";
    let idLogin = document.getElementById("loginRef");
    let idRegister = document.getElementById("registerRef");
    console.log(clickChange)
    if (clickChange === true) {
        idLogin?.classList.add(className);
        idRegister?.classList.remove(className);
    } else {
        idRegister?.classList.add(className);
        idLogin?.classList.remove(className);
    }
    console.log(props)
    return (
        <div className="layout-container">
          <div className="login-signup__wrapper ">
            <div
              className="login-signup--login active"
              id="loginRef"
              onClick={() => setClickChange(true)}
            >
                Đăng nhập
            </div>
            <div
              className="login-signup--signup"
              id="registerRef"
              onClick={() => setClickChange(false)}
            >
              Đăng ký
            </div>
          </div>

          {clickChange === true ? <Login isAuthentication = {props.isAuthentication} onLocalLogin = {props.onLocalLogin} loading = {props.loading} {...props}/> : <Signup isAuthentication = {props.isAuthentication} {...props}/>}
        </div>
    )
}

export default LayoutLoginSignup;