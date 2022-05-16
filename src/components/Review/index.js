import React from "react";
import { Toast } from "react-bootstrap";
import Rating from "react-rating";
import { BsStar, BsStarFill } from "react-icons/bs";
import "./style.css";

const Review = ({ closeButton, review }) => {
  return (
    <Toast className="review" style={{ maxWidth: "none" }}>
      <Toast.Header closeButton={closeButton}>
        <img src={review.avatarUrl} className="rounded mr-2" alt="" />
        <strong className="mr-auto">{review.userName}</strong>
        <small style={{ fontSize: "14px" }}>{review.time}</small>
      </Toast.Header>
      <Toast.Body>
        <Rating
          initialRating={review.rating}
          emptySymbol={<BsStar />}
          fullSymbol={<BsStarFill />}
          readonly
        />
        <br />
        <p className="mb-0" style={{ fontSize: "20px" }}>
          {review.comment}
        </p>
      </Toast.Body>
    </Toast>
  );
};

export default Review;
