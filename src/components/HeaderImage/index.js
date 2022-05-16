import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import ButtonUpdateHeaderImage from "../ButtonUpdateHeaderImage";
import YesNoQuestion from "../Dialog/YesNoQuestion";
import HeaderImageApi from "../../api/header-image";
import SAlert from "react-s-alert";

const HeaderImage = ({ headerImageData, handleOnUpdate }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await HeaderImageApi.delete(headerImageData.id);
      if (response.status === 200) {
        SAlert.success(response.data.message);
        handleOnUpdate();
      }
    } catch (err) {
      const errMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      SAlert.error(errMessage);
    }
    setOpenDeleteDialog(false);
  };
  return (
    <Card key={headerImageData.id} className="mb-2">
      <Card.Img variant="top" src={headerImageData.url} alt={headerImageData.title} />
      <Card.Body>
        <Card.Title>{headerImageData.title}</Card.Title>
        <Card.Text>
          <strong>Ngày tạo: </strong>
          {headerImageData.createdOn}
          <br />
          <strong>Đường dẫn: </strong>
          <a href={headerImageData.linkTo}>Link đường dẫn</a>
          <br />
          <strong>Trạng thái: </strong>
          {headerImageData.enable ? (
            <span className="text-success">Đang hiển thị</span>
          ) : (
            <span className="text-danger">Đang ẩn</span>
          )}
        </Card.Text>
        <ButtonUpdateHeaderImage
          currentData={headerImageData}
          onSave={() => handleOnUpdate()}
        />
        <Button
          variant="danger"
          className="ml-2"
          onClick={() => setOpenDeleteDialog(true)}
        >
          Xóa
        </Button>
        <YesNoQuestion
          isOpen={openDeleteDialog}
          onClickNo={() => setOpenDeleteDialog(false)}
          onClickYes={handleDelete}
        />
      </Card.Body>
    </Card>
  );
};

HeaderImage.propTypes = {
  headerImageData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["Slider", "Banner"]).isRequired,
    enable: PropTypes.bool.isRequired,
    createdOn: PropTypes.string.isRequired,
  }),
};

export default HeaderImage;
