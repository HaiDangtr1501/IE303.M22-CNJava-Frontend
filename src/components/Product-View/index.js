import React, { useState } from "react";
import { Card, Badge, Button, ButtonGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import "./style.css";
import { Link } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import SAlert from "react-s-alert";
import Rating from "react-rating";
import CartApi from "../../api/cart";
import YesNoQuestion from "../Dialog/YesNoQuestion";
import ProductApi from "../../api/product";

const ProductView = ({ isAuth, isAdmin, enableBtnAddToCard, product }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const getImageOfficial = () => {
    const official = product.images.find(({ type }) => type === "Official");
    return official.url;
  };
  console.log("product id: ", product)
  const addToCart = async () => {
    try {
      const response = await CartApi.addProduct(product.id);
      if (response.status === 200) {
        SAlert.success(response.data);
      }
    } catch (error) {
      SAlert.error(error.response.data.message);
    }
  };

  const handleDeleteProduct = async () => {
    setOpenDeleteDialog(false);
    try {
      const response = await ProductApi.deleteProduct(product.id);
      if (response.status === 200) {
        SAlert.success("Đã xóa sản phẩm " + product.name);
      }
    } catch (error) {
      SAlert.error(error.response.data.message);
    }
  };

  const resolve = Math.round(
    (product.price - (product.price * product.discount) / 100) / 10000
  ) * 10000
  console.log(resolve);
  return (
    <Card className="product-card p-2" key={product.id}>
      <Link to={`/products/${product.id}`}>
        <Card.Img style={{ cursor: "pointer" }} variant="top" src={getImageOfficial()} />
      </Link>
      <Card.Body className="p-2">
        <Link to={`/products/${product.id}`}>
          <h3 style={{ cursor: "pointer" }}>{product.name}</h3>
        </Link>
        <Card.Text></Card.Text>
        <h5>
          {/* <NumberFormat
            value={
              Math.round(
                (product.price - (product.price * product.discount) / 100) / 10000
              ) * 10000
            }
            thousandSeparator={true}
            suffix=" VND"
            displayType="text"
          />{" "} */}
          {resolve.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
          })} {" "}
          {product.discount !== 0 && (
            <React.Fragment>
              <span
                className="old-price"
              >
              {product.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
              })} {" "}
              </span>
              {/* <NumberFormat
                className="old-price"
                value={product.price}
                thousandSeparator={true}
                suffix="đ"
                displayType="text"
              />{" "} */}
              <Badge variant="danger">-{product.discount}%</Badge>
            </React.Fragment>
          )}
        </h5>
        <div style={{ minHeight: "30px" }}>
          {product.reviewCount > 0 && (
            <>
              <Rating
                initialRating={product.rating}
                emptySymbol={<BsStar color="#fb7234" />}
                fullSymbol={<BsStarFill color="#fb7234" />}
                readonly
              />{" "}
              <span style={{ color: "#fb7234" }}>{product.reviewCount}</span>
            </>
          )}
        </div>
        {isAdmin && (
          <ButtonGroup className="w-100" size="sm">
            <Button
              as={Link}
              to={`/admin/edit-product/${product.id}`}
              className="mb-2"
              variant="success"
            >
              Chỉnh sửa
            </Button>
            <Button
              variant="danger"
              onClick={() => setOpenDeleteDialog(true)}
              className="mb-2"
              size="sm"
            >
              Xóa
            </Button>
            <YesNoQuestion
              dialogTitle="Xác nhận xóa sản phẩm"
              dialogDescription="Thông tin sản phẩm sẽ bị xóa đi vĩnh viễn"
              isOpen={openDeleteDialog}
              onClickYes={handleDeleteProduct}
              onClickNo={() => setOpenDeleteDialog(false)}
            />
          </ButtonGroup>
        )}

        {enableBtnAddToCard && isAuth && !isAdmin &&(
          <Button onClick={addToCart} variant="primary">
            Thêm vào giỏ hàng
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

ProductView.defaultProps = {
  isAdmin: false,
  isAuth: false,
  enableBtnAddToCard: false,
  product: null,
};

ProductView.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  enableBtnAddToCard: PropTypes.bool.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    categoryName: PropTypes.string.isRequired,
    reviewCount: PropTypes.number.isRequired,
    rating: PropTypes.number,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["Official", "Slider", "Banner"]).isRequired,
      })
    ),
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    brandName: PropTypes.string.isRequired,
  }),
};

export default ProductView;
