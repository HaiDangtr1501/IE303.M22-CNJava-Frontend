import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
  useRef,
} from "react";
import { Card, Badge, Button, ButtonGroup } from "react-bootstrap";
import PropTypes, { array } from "prop-types";
import NumberFormat from "react-number-format";
import "./style.css";
import { Link } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import SAlert from "react-s-alert";
import Rating from "react-rating";
import CartApi from "../../api/cart";
import YesNoQuestion from "../Dialog/YesNoQuestion";
import ProductApi from "../../api/product";
import { useStore, actions } from "../../store";
const ProductView = ({
  isAuth,
  isAdmin,
  enableBtnAddToCard,
  product,
  isInCart,
  isInCartLocal
}) => {
  const [state, dispatch] = useStore();
  const { countCartItems } = state;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [checkQuantity, setCheckQuantity] = useState(false);

  const dataLocalProduct = useRef(0)

  // const dataLocalProduct = useRef(0)
  // const [listItem, setListItem] = useState([]);
  
  const getImageOfficial = () => {
    const official = product.images.find(({ type }) => type === "Official");
    return official.url;
  };

  const addToCart = async () => {
    if (!isAuth) {
      let localCarts = localStorage.getItem("products")
        ? JSON.parse(localStorage.getItem("products"))
        : [];
      let productCart = {
        id: product.id,
        discount: product.discount,
        images: product.images[0],
        name: product.name,
        price: product.price,
        quantity: 1,
        stock: product.quantity,
        enable: true,
        key: 1,
      };
      // if(localCarts[0] === undefined) {
      //   productCart.quantity--;
      //   localCarts.push(productCart);
      // }
      let flag = false;
      for (let i = 0; i < localCarts.length; i++) {
        localCarts[i].key++;
        // SAlert.success(`Thêm thành công sản phẩm ${localCarts[i].name} vào giỏ hàng`)
        // if (localCarts[i].name === productCart.name) {
        //   if (localCarts[i].quantity + 1 > localCarts[i].stock) {
        //     SAlert.error("Không đủ sản phẩm");
        //     setCheckQuantity(true);
        //   } else {
        //     localCarts[i].quantity++;
        //   }
        //   flag = true;
        //   break;
        // }
      }
      if (!flag) {
        SAlert.success(`Thêm thành công vào giỏ hàng`);
        localCarts.push(productCart);
      }
      
      localStorage.setItem("products", JSON.stringify(localCarts));

      dataLocalProduct.current = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
      dispatch(actions.addCart(dataLocalProduct.current.length));
    }else{
      try {
        const response = await CartApi.addProduct(product.id);
        // console.log("duy" + response.data);
        if (response.status === 200) {
          SAlert.success(response.data);
        }
      } catch (error) {
        SAlert.error(error.response.data.message);
      }
      try {
        const countCartItems = await CartApi.getCart();
        dispatch(actions.addCart(countCartItems.data.length));
      } catch (e) {}
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

  const resolve =
    Math.round(
      (product.price - (product.price * product.discount) / 100) / 10000
    ) * 10000;

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
          <h3 className="product-card_title" style={{ cursor: "pointer" }}>
            {product.name}
          </h3>
        </Link>

        <h5 className="old-price_container">
          {resolve.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </h5>
        <h5>
          {product.discount !== 0 && (
            <React.Fragment>
              <span className="old-price">
                {product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
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
        <div
          style={{ minHeight: "30px", marginBottom: "10px", marginTop: "5px" }}
        >
          {product.reviewCount > 0 && (
            <>
              <Rating
                initialRating={product.rating}
                emptySymbol={<BsStar color="#FADB14" />}
                fullSymbol={<BsStarFill color="#FADB14" />}
                readonly
              />{" "}
              {/* <span style={{ color: "#FADB14" }}>{product.reviewCount}</span> */}
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
            isInCart ? (
              <Button disabled>Đã thêm vào giỏ hàng</Button>
            ) : (
              <Button
                
                variant="success"
                onClick={addToCart}
                id="buttonAddCart"
              >
                Thêm giỏ hàng <BsCartPlus />
              </Button>
            )
          )}
          {!isAdmin && !isAuth && (
            isInCartLocal ? (
              <Button disabled>Đã thêm vào giỏ hàng</Button>
            ) : (
              <Button
                
                variant="success"
                onClick={addToCart}
                id="buttonAddCart"
              >
                Thêm giỏ hàng <BsCartPlus />
              </Button>
            )
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

export default memo(ProductView);
