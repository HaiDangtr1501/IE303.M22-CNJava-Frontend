import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import SAlert from "react-s-alert";
import HeaderImageApi from "../../api/header-image";

const EditHeaderImage = ({ onSubmit }) => {
  const [headerImage, setHeaderImage] = useState({
    title: "",
    linkTo: "",
    type: "Banner",
    enable: null,
  });
  const [image, setImage] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append(
        "meta-data",
        new Blob([JSON.stringify(headerImage)], {
          type: "application/json",
        })
      );
      data.append("image", image);

      const response = await HeaderImageApi.addHeaderImage(data);
      if (response.status === 200) {
        SAlert.success(response.data.message);
      }
      onSubmit();
    } catch (err) {
      const errMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      SAlert.error(errMessage);
    }
  };

  return (
    <Card>
      <Card.Header>Thêm Hình Ảnh</Card.Header>
      <Card.Body>
        <Form onSubmit={(e) => handleOnSubmit(e)}>
          <Form.Group>
            <Form.Label htmlFor="updatedTitle">Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              id="updatedTitle"
              name="updatedTitle"
              onChange={(e) => setHeaderImage({ ...headerImage, title: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="updatedLinkTo">Đường dẫn đến</Form.Label>
            <Form.Control
              type="text"
              id="updatedLinkTo"
              name="updatedLinkTo"
              onChange={(e) => setHeaderImage({ ...headerImage, linkTo: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="updatedType">Loại ảnh</Form.Label>
            <Form.Control
              id="updatedType"
              name="updatedType"
              as="select"
              defaultValue="Banner"
              onChange={(e) => setHeaderImage({ ...headerImage, type: e.target.value })}
            >
              <option value="Banner">Banner</option>
              <option value="Slider">Slider</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="updatedImage">File ảnh</Form.Label>
            <Form.Control
              type="file"
              id="updatedImage"
              name="updatedImage"
              size="sm"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image && (
              <Card className="mt-2">
                <Card.Img src={URL.createObjectURL(image)} />
              </Card>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="updatedEnable">Hiển thị</Form.Label>
            <Form.Check
              type="switch"
              id="updatedEnable"
              name="updatedEnable"
              onChange={(e) =>
                setHeaderImage({ ...headerImage, enable: e.target.checked })
              }
            />
          </Form.Group>
          <Button type="submit">Thêm ảnh</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditHeaderImage;
