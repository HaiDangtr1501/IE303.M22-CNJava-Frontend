import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
import HeaderImage from "../HeaderImage";

const HeaderImageList = ({ headerImageList, handleOnUpdate }) => {
  return headerImageList.length > 0 ? (
    <div style={{ height: "650px" }} className="overflow-auto border p-2">
      {headerImageList.map((headerImage) => {
        return (
          <HeaderImage
            headerImageData={headerImage}
            key={headerImage.id}
            handleOnUpdate={() => handleOnUpdate()}
          />
        );
      })}
    </div>
  ) : (
    <Alert variant="info">Không có hình ảnh</Alert>
  );
};

HeaderImageList.propTypes = {
  isEnable: PropTypes.bool,
  type: PropTypes.oneOf(["Slider", "Banner"]),
};

export default HeaderImageList;
