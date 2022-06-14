import React, { useEffect, useState, memo, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import ProductApi from "../../../api/product";
import SAlert from "react-s-alert";
import PropTypes from "prop-types";
import { Table, Alert } from "react-bootstrap";

const AdminProductList = (props) => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(props.page);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsLocal, setCartItemsLocal] = useState([]);
  const [check, setCheck] = useState(false);

  const dataLocalProduct = useRef(0);
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
  return productList.length > 0 ? (
    <div>
      <Alert variant="info" className="mb-4">
        <h2 className="mb-0 text-center">Danh sách sản phẩm</h2>
      </Alert>
      {productList && productList.length > 0 && !loading && (
        <>
          <Table bordered striped size="sm" className="mb-3">
            <thead className="text-center">
              <tr>
                <th>Tên sản phẩm</th>
                <th>Thương hiệu</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Giảm giá</th>
                {/* <th>Thêm quyền quản trị viên</th> */}
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <>
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.brandName}</td>
                    <td>
                      {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>{product.quantity}</td>
                    <td>{product.discount}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
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

AdminProductList.defaultProps = {
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

AdminProductList.propTypes = {
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

export default memo(AdminProductList);
