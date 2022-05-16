import React from "react";
import { Button, Spinner } from "react-bootstrap";

const ButtonSendEmailVerify = ({ id, isSending, isSended, onClick }) => {
  return (
    <Button id={id} size="sm" variant={isSended ? "success" : "danger"} onClick={onClick}>
      {isSending ? (
        <>
          Đang gửi email... <Spinner animation="border" variant="light" size="sm" />
        </>
      ) : isSended ? (
        "Email xác nhận đã gửi"
      ) : (
        "Gửi lại email xác nhận"
      )}
    </Button>
  );
};

export default ButtonSendEmailVerify;
