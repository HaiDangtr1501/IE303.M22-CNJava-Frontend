import React, { useState } from "react";
import { Card, Badge, Button, ButtonGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import "./style.css";
import { Link } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import { BsCartPlus} from "react-icons/bs";
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

  return (
    <Card className="product-card" key={product.id}>
      <Link to={`/products/${product.id}`}>
        <Card.Img
          style={{ cursor: "pointer" }}
          variant="top"
          src={getImageOfficial()}
          className="product-card_img"
        />
      </Link>
      <Card.Body className="p-2">
        <Link to={`/products/${product.id}`} className="product-card_link">
          <h3 className="product-card_title" style={{ cursor: "pointer" }}>{product.name}</h3>
        </Link>
        <h5>
          <NumberFormat
            value={
              Math.round(
                (product.price - (product.price * product.discount) / 100) /
                  10000
              ) * 10000
            }
            thousandSeparator={true}
            suffix="đ"
            displayType="text"
          />
        </h5>
        <h5 className="old-price_container">
          {product.discount !== 0 && (
            <React.Fragment>
              <NumberFormat
                className="old-price"
                value={product.price}
                thousandSeparator={true}
                suffix="đ"
                displayType="text"
              />{" "}
              <Badge variant="danger">-{product.discount}%</Badge>
            </React.Fragment>
          )}
        </h5>
        <div style={{ minHeight: "30px", marginBottom:"10px", marginTop:"5px" }}>
          {product.reviewCount > 0 && (
            <>
              <Rating
                initialRating={product.rating}
                emptySymbol={<BsStar color="#fb7234" />}
                fullSymbol={<BsStarFill color="#fb7234" />}
                readonly
              />{" "}
              {/* <span style={{ color: "#fb7234" }}>{product.reviewCount}</span> */}
            </>
          )}
        </div>
        {isAdmin && (
          <ButtonGroup className="w-100" size="sm">
            <Button
              as={Link}
              to={`/admin/edit-product/${product.id}`}
              className="mb-2 product-btn-update"
              variant="primary"
            >
              Chỉnh sửa
            </Button>
            <Button
              variant="danger"
              onClick={() => setOpenDeleteDialog(true)}
              className="mb-2 product-btn-delete"
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
        {!isAdmin && isAuth && (
          <Button onClick={addToCart} variant="success" className="addCart-btn">
            Thêm vào giỏ hàng <BsCartPlus/>
          </Button>)
        }
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
