import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingIndicator = ({ size, height }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: height }}
    >
      <Spinner
        animation="border"
        variant="primary"
        style={{ width: { size }, height: { size } }}
      ></Spinner>
      <h5 className="mt-3 text-primary">Loading</h5>
    </div>
  );
};

LoadingIndicator.defaultProps = {
  size: "60px",
  height: "100vh",
};

export default LoadingIndicator;
