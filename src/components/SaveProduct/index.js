import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Form,
  Button,
  Spinner,
  Card,
  Alert,
  Row,
  CardColumns,
} from "react-bootstrap";
import Select from "react-select";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import "./style.css";

import ProductApi from "../../api/product";

const productInitState = {
  name: "",
  description: "",
  categoryName: "",
  brandName: "",
  price: "",
  quantity: "",
  discount: "",

  // Laptop
  cpu: "",
  // LapTop, SmartPhone
  ram: "",
  // LapTop
  hardDrive: "",
  // LapTop, SmartPhone
  display: "",
  // LapTop
  size: "",
  // LapTop
  graphicsCard: "",
  // LapTop, SmartPhone
  operatingSystem: "",
  // LapTop
  design: "",
  // SmartPhone
  fontCamera: "",
  // SmartPhone
  rearCamera: "",
  // SmartPhone
  chipName: "",
  // SmartPhone
  internalMemory: "",
  // SmartPhone
  sim: "",
  // SmartPhone
  batteryCapacity: "",
};

const imageInitState = {
  file: null,
  preview: undefined,
};

const SaveProduct = ({ editMode }) => {
  const [product, setProduct] = useState(productInitState);
  const [listCategory, setListCategory] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [imageOfficial, setImageOfficial] = useState(imageInitState);
  const [listImageSlider, setListImageSlider] = useState([]);
  const [message, setMessage] = useState({ success: undefined, error: undefined });
  const [loading, setLoading] = useState(false);

  const { productId } = useParams();
  const oldBrand = useRef(null);

  useEffect(() => {
    const loadProductForUpdate = async () => {
      const response = await ProductApi.getById(productId);
      const productUpdated = response.data;

      setProduct({
        name: productUpdated.name,
        description: productUpdated.description,
        categoryName: productUpdated.categoryName,
        brandName: productUpdated.brandName,
        price: productUpdated.price,
        quantity: productUpdated.quantity,
        discount: productUpdated.discount,
        cpu: productUpdated.details.cpu,
        ram: productUpdated.details.ram,
        hardDrive: productUpdated.details.hardDrive,
        display: productUpdated.details.display,
        size: productUpdated.details.size,
        design: productUpdated.details.design,
        graphicsCard: productUpdated.details.graphicsCard,
        operatingSystem: productUpdated.details.operatingSystem,
        fontCamera: productUpdated.details.fontCamera,
        rearCamera: productUpdated.details.rearCamera,
        chipName: productUpdated.details.chipName,
        internalMemory: productUpdated.details.internalMemory,
        sim: productUpdated.details.sim,
        batteryCapacity: productUpdated.details.batteryCapacity,
      });
    };

    loadBrandOptions();
    loadCategoryOptions();
    if (editMode) {
      loadProductForUpdate();
    }
  }, [productId, editMode]);

  const loadCategoryOptions = async () => {
    const response = await ProductApi.getCategory();
    const optionsCategoryCustom = response.data.map((item) => ({
      label: item,
      value: item,
    }));
    setListCategory(optionsCategoryCustom);
  };

  const loadBrandOptions = async () => {
    const response = await ProductApi.getBrand();
    const optionsBrandCustom = response.data.map((item) => ({
      label: item,
      value: item,
    }));
    setListBrand(optionsBrandCustom);
  };

  const onChangeImageOfficial = (e) => {
    setImageOfficial({
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const onChangeListImage = (e) => {
    const listImage = Object.values(e.target.files);
    setListImageSlider(listImage);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setMessage({ success: undefined, error: undefined });
    setLoading(true);

    const formData = new FormData();
    if (imageOfficial.file !== null) {
      formData.append("official", imageOfficial.file);
    }

    listImageSlider.forEach((image) => {
      formData.append("slider", image);
    });

    formData.append(
      "product",
      new Blob([JSON.stringify(product)], {
        type: "application/json",
      })
    );

    try {
      let response;
      if (editMode) {
        response = await ProductApi.updateProduct(productId, formData);
      } else {
        response = await ProductApi.createProduct(formData);
      }
      setMessage({ success: response.data.message });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setMessage({ error: err.response.data.message });
      setLoading(false);
    }
  };

  const productDetailsByCategory = (category) => {
    switch (category) {
      case "SmartPhone":
        return (
          <>
            <Form.Group>
              <Form.Label>Màn Hình</Form.Label>
              <Form.Control
                type="text"
                value={product.display}
                onChange={(e) => setProduct({ ...product, display: e.target.value })}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Hệ điều hành</Form.Label>
              <Form.Control
                type="text"
                value={product.operatingSystem}
                onChange={(e) =>
                  setProduct({ ...product, operatingSystem: e.target.value })
                }
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Camera trước</Form.Label>
              <Form.Control
                type="text"
                value={product.fontCamera}
                onChange={(e) => setProduct({ ...product, fontCamera: e.target.value })}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Camera sau</Form.Label>
              <Form.Control
                type="text"
                value={product.rearCamera}
                onChange={(e) => setProduct({ ...product, rearCamera: e.target.value })}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Chip</Form.Label>
              <Form.Control
                type="text"
                value={product.chipName}
                onChange={(e) => setProduct({ ...product, chipName: e.target.value })}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ram</Form.Label>
              <Form.Control
                type="text"
                value={product.ram}
                onChange={(e) => setProduct({ ...product, ram: e.target.value })}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Bộ nhớ trong</Form.Label>
              <Form.Control
                type="text"
                value={product.internalMemory}
                onChange={(e) =>
                  setProduct({ ...product, internalMemory: e.target.value })
                }
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Sim</Form.Label>
              <Form.Control
                type="text"
                value={product.sim}
                onChange={(e) => setProduct({ ...product, sim: e.target.value })}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Pin, Sạc</Form.Label>
              <Form.Control
                type="text"
                value={product.batteryCapacity}
                onChange={(e) =>
                  setProduct({ ...product, batteryCapacity: e.target.value })
                }
                required
              ></Form.Control>
            </Form.Group>
          </>
        );
      case "Laptop":
        return (
          <>
            <Form.Group>
              <Form.Label>CPU</Form.Label>
              <Form.Control
                type="text"
                value={product.cpu}
                onChange={(e) => setProduct({ ...product, cpu: e.target.value })}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ram</Form.Label>
              <Form.Control
                type="text"
                value={product.ram}
                onChange={(e) => setProduct({ ...product, ram: e.target.value })}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ổ cứng</Form.Label>
              <Form.Control
                type="text"
                value={product.hardDrive}
                onChange={(e) => setProduct({ ...product, hardDrive: e.target.value })}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Card màn hình</Form.Label>
              <Form.Control
                type="text"
                value={product.graphicsCard}
                onChange={(e) => setProduct({ ...product, graphicsCard: e.target.value })}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Màn Hình</Form.Label>
              <Form.Control
                type="text"
                value={product.display}
                onChange={(e) => setProduct({ ...product, display: e.target.value })}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Kích thước</Form.Label>
              <Form.Control
                type="text"
                value={product.size}
                onChange={(e) => setProduct({ ...product, size: e.target.value })}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Thiết kế</Form.Label>
              <Form.Control
                type="text"
                value={product.design}
                onChange={(e) => setProduct({ ...product, design: e.target.value })}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Hệ điều hành</Form.Label>
              <Form.Control
                type="text"
                value={product.operatingSystem}
                onChange={(e) =>
                  setProduct({ ...product, operatingSystem: e.target.value })
                }
                required
              ></Form.Control>
            </Form.Group>
          </>
        );
      default:
        break;
    }
  };

  return (
    <Form onSubmit={handleSaveProduct}>
      <Row className="mb-3">
        <Col lg="8" className="align-items-center">
          <Card>
            <Card.Header>
              <h3 className="text-center">
                {editMode ? "Cập nhật thông tin sản phẩm" : "Thêm sản phẩm mới"}
              </h3>
            </Card.Header>
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} md="6">
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    type="number"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Loại sản phẩm</Form.Label>
                  {editMode ? (
                    <Form.Text>
                      <h4>{product.categoryName}</h4>
                    </Form.Text>
                  ) : (
                    <Select
                      onChange={(e) => setProduct({ ...product, categoryName: e.value })}
                      placeholder="category options"
                      options={listCategory}
                    />
                  )}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Thương hiệu</Form.Label>
                  {editMode && (
                    <Form.Text ref={oldBrand}>
                      <h4>{product.brandName}</h4>
                    </Form.Text>
                  )}
                  <Select
                    onChange={(e) => {
                      setProduct({ ...product, brandName: e.value });
                    }}
                    placeholder="brand options"
                    options={listBrand}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Giảm giá</Form.Label>
                  <Form.Control
                    type="number"
                    value={product.discount}
                    onChange={(e) => setProduct({ ...product, discount: e.target.value })}
                    required
                    min={0}
                    max={100}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Số lượng</Form.Label>
                  <Form.Control
                    type="number"
                    value={product.quantity}
                    onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group>
                <Form.Label>Ảnh chính sản phẩm</Form.Label>
                <Form.Control type="file" onChange={onChangeImageOfficial} />
                {imageOfficial.preview && (
                  <Card as={Col} md="8">
                    <Card.Img src={imageOfficial.preview} width="50%" />
                  </Card>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Slider hình ảnh cho sản phẩm</Form.Label>
                <Form.Control type="file" multiple onChange={onChangeListImage} />
                {listImageSlider.length > 0 && (
                  <CardColumns>
                    {listImageSlider.map((file, index) => {
                      return (
                        <Card key={index}>
                          <Card.Img variant="top" src={URL.createObjectURL(file)} />
                          <Card.Body>
                            <Card.Text>{file.name}</Card.Text>
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </CardColumns>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  value={product.description}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="4">
          <Card>
            <Card.Header>
              <h3 className="text-center">Thông số sản phẩm</h3>
            </Card.Header>
            <Card.Body>
              {!product.categoryName ? (
                <Card.Text className="text-center">Chọn loại sản phẩm trước</Card.Text>
              ) : (
                productDetailsByCategory(product.categoryName)
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Form.Group>
        {message.error && (
          <Alert className="text-center" variant="danger">
            {message.error}
          </Alert>
        )}
        {message.success && (
          <Alert className="text-center mb-0" variant="success">
            {message.success}
          </Alert>
        )}
        <Button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? (
            <Spinner animation="border"></Spinner>
          ) : (
            <h4>{editMode ? "Sửa thông tin sản phẩm" : "Thêm sản phẩm"}</h4>
          )}
        </Button>
      </Form.Group>
    </Form>
  );
};

SaveProduct.defaultProps = {
  editMode: false,
};

SaveProduct.propTypes = {
  editMode: PropTypes.bool,
};
export default SaveProduct;
