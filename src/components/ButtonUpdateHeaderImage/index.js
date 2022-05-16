import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, Card } from "react-bootstrap";
import HeaderImageApi from "../../api/header-image";
import SAlert from "react-s-alert";

const ButtonUpdateHeaderImage = ({ currentData, onSave }) => {
  const [show, setShow] = useState(false);

  const [headerImage, setHeaderImage] = useState({
    title: currentData.title,
    linkTo: currentData.linkTo,
    type: currentData.type,
    enable: currentData.enable,
    url: currentData.url,
  });
  const [image, setImage] = useState(null);

  const handleOnShow = () => {
    setShow(true);
  };
  const handleOnClose = () => {
    setShow(false);
  };

  const handleOnSave = async () => {
    try {
      const data = new FormData();
      data.append(
        "meta-data",
        new Blob([JSON.stringify(headerImage)], {
          type: "application/json",
        })
      );
      if (image) {
        data.append("image", image);
      }

      const response = await HeaderImageApi.updateHeaderImage(currentData.id, data);
      if (response.status === 200) {
        SAlert.success(response.data.message);
        onSave();
      }
    } catch (err) {
      const errMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      SAlert.error(errMessage);
    }

    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleOnShow}>
        Cập nhật
      </Button>

      <Modal show={show} onHide={handleOnClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật thông tin ảnh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label htmlFor="title">Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                id="title"
                name="title"
                value={headerImage.title}
                onChange={(e) =>
                  setHeaderImage({ ...headerImage, title: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="linkTo">Đường dẫn đến</Form.Label>
              <Form.Control
                type="text"
                id="linkTo"
                name="linkTo"
                value={headerImage.linkTo}
                onChange={(e) =>
                  setHeaderImage({ ...headerImage, linkTo: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="type">Loại ảnh</Form.Label>
              <Form.Control
                id="type"
                name="type"
                as="select"
                defaultValue={headerImage.type}
                onChange={(e) => setHeaderImage({ ...headerImage, type: e.target.value })}
              >
                <option value="Banner">Banner</option>
                <option value="Slider">Slider</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="image">File ảnh</Form.Label>
              <Form.Control
                type="file"
                id="image"
                name="image"
                size="sm"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {image ? (
                <Card className="mt-2">
                  <Card.Img src={URL.createObjectURL(image)} />
                </Card>
              ) : (
                <Card className="mt-2">
                  <Card.Img src={headerImage.url} />
                </Card>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="enable">Hiển thị</Form.Label>
              <Form.Check
                type="switch"
                id="enable"
                name="enable"
                checked={headerImage.enable}
                onChange={(e) =>
                  setHeaderImage({ ...headerImage, enable: e.target.checked })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOnClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleOnSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ButtonUpdateHeaderImage.propTypes = {
  currentData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["Slider", "Banner"]).isRequired,
    enable: PropTypes.bool.isRequired,
    createdOn: PropTypes.string.isRequired,
  }),
};

export default ButtonUpdateHeaderImage;
