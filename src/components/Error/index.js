import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";

const Error = () => {
  return (
    <div className="h-100 justify-content-center align-items-center">
      <Jumbotron>
        <h1 className="mb-4">404 Page Not Found</h1>
        <Link to="/">
          <Button>Go Back</Button>
        </Link>
      </Jumbotron>
    </div>
  );
};

export default Error;
