import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProductView from "../Product-View";
import ProductApi from "../../api/product";
import SAlert from "react-s-alert";
import PropTypes from "prop-types";
import "./style.css";
import LoadingIndicator from "../LoadingIndicator";

const ProductList = (props) => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(props.page);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getProductData = async () => {
      try {
        const response = await ProductApi.getAll({
          // Product page
          page: props.page,
          size: props.size,
          sortDirection: props.sortDirection,
          sortBy: props.sortBy,

          // Product filter
          name: props.name,
          brand: props.brand,
          category: props.category,
          minPrice: props.minPrice,
          maxPrice: props.maxPrice,
        });
        setProductList(response.data.content);
        setTotalPage(response.data.totalPages);
        if (props.handleWithTotalPage) {
          props.handleWithTotalPage(response.data.totalPages);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        SAlert.error(err.message);
      }
    };

    const timer = setTimeout(() => {
      getProductData();
    }, 400);

    return () => clearTimeout(timer);
  }, [props]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return productList.length > 0 ? (
    <>
      <Row>
        {productList.map((product) => (
          <Col md="3" key={product.id}>
            <ProductView
              enableBtnAddToCard={props.enableBtnAddToCard}
              isAdmin={props.isAdmin}
              product={product}
              isAuth={props.isAuth}
            />
          </Col>
        ))}
      </Row>
      {/* {props.enablePagination && (
        
      )} */}
    </>
  ) : (
    <Row className="justify-content-center">
      <Col md="12" className="text-center mb-4">
        <div className="mb-2">
          <strong>"Không tìm thấy sản phẩm"</strong>
        </div>
      </Col>
    </Row>
  );
};

ProductList.defaultProps = {
  enableBtnAddToCard: false,
  isAdmin: false,

  sortDirection: "desc",
  sortBy: "createdDate",

  name: null,
  brand: null,
  category: null,
  minPrice: null, // default minPrice in server is 0
  maxPrice: null,
};

ProductList.propTypes = {
  handleWithTotalPage: PropTypes.func,

  isAdmin: PropTypes.bool.isRequired,
  enableBtnAddToCard: PropTypes.bool.isRequired,

  page: PropTypes.number,
  size: PropTypes.number,
  sortDirection: PropTypes.oneOf(["asc", "desc"]),
  sortBy: PropTypes.oneOf(["createdDate", "price"]),

  name: PropTypes.string,
  brand: PropTypes.string,
  category: PropTypes.oneOf(["SmartPhone", "Laptop"]),
  maxPrice: PropTypes.number,
  minPrice: PropTypes.number,
};

export default ProductList;
